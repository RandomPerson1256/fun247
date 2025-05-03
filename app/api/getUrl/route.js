import Connection from "@/db/Connection";
import LASER from "@/db/Main";
import { NextResponse } from "next/server";

export const revalidate = 0; // this is the new line added


export async function GET(req,res){
    try {
        await Connection();
        const response = await LASER.findById('68160e114ba07de57a32827b').lean();
        if (!response) {
            return NextResponse.error("Data not found");
        }
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.error("Something went wrong");
    }
}
