import { NextRequest, NextResponse } from "next/server";
import { db } from "../../db";

export async function POST(req: NextRequest) {
    const data=await req.json()
    // const submission = db.submission.updateMany({

    // })
    console.log("Callback data: ",data);
    return NextResponse.json({
        data: data,
        message: "Callback recieved"
    })
}