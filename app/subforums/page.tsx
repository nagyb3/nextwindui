"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { supabase } from "@/components/supabase/supabaseClient";

export default function page() {
  useEffect(() => {
    const fetchSubforums = async () => {
      const { data, error } = await supabase.from("users").select();
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        console.log(data);
      }
    };
    fetchSubforums();
  }, []);

  return (
    <div className="min-h-[100vh]">
      <Navbar></Navbar>
      <div className="flex flex-col items-center py-16 gap-y-8">
        <h1 className="font-sembioldt text-3xl">Subforums:</h1>
      </div>
    </div>
  );
}
