"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Post = {
  id: number
  content: string
  created_at: string
}

//情報を読み込む関数
export default function Home(){
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    const {data, error} = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

    if(error){
      console.error("読み込みエラー:", error)
    }
    else{
      setPosts(data || [])
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handlePost = async () => {
    if(!text) return

    setLoading(true)

    const {error} = await supabase.from("posts")
    .insert([{content: text}])

    if(error){
      alert("エラーが発生しました")
    }
    else{
      setText("")
      fetchPosts()
    }

    setLoading(false)
  }

  return(
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6 bg-slate-50">
      <h1 className="text-3xl font-bold text-slate-800">DBテスト</h1>
      
      <div className="flex w-full max-w-sm items-center space-x-2 bg-white p-4 rounded-xl shadow-sm">
        <Input placeholder="メッセージを入力" value={text} onChange={(e) => setText(e.target.value)} disabled={loading}></Input>
        <Button onClick={handlePost} disabled={loading}>{loading ? "送信中" : "送信"}</Button>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-2">
          <h2 className="font-semibold text-slate-600">投稿一覧</h2>
          {posts.map((post) => (
            <div key={post.id} className="p-3 bg-white border boder-slate-200 rounded-lg shadow-sm">
              <strong>{post.created_at}</strong>
              <br />
              {post.content}
            </div>
          ))}
          {posts.length === 0 && <p className="text-slate-400">まだ投稿がありません</p>}
        </div>
    </main>
  )
}