"use client"

import {useState} from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home(){
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false)

  const handlePost = async () => {
    if(!text) return

    setLoading(true)

    const {error} = await supabase.from("posts").insert([{content: text}])

    if(error){
      alert("エラーが発生しました")
    }
    else{
      alert("投稿成功!")
    }

    setText("")
    setLoading(false)
  }

  return(
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6 bg-slate-50">
      <h1 className="text-3xl font-bold text-slate-800">カジノアプリ開発テスト</h1>

      <div className="flex w-full max-w-sm items-center space-x-2 bg-white p-4 rounded-xl shadow-sm">
        <Input placeholder="メッセージを入力" value={text} onChange={(e) => setText(e.target.value)} disabled={loading}></Input>
        <Button onClick={handlePost} disabled={loading}>{loading ? "送信中" : "送信"}</Button>
      </div>
      <p className="text-sm text-slate-500">ボタンを押すとsupabaseのDBに保持されるよ</p>
    </main>
  )
}