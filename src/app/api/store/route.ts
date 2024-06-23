
import type { NextApiRequest } from 'next';
export async function GET(request: NextApiRequest) {
    "use server"
    console.log("hererer");

    try {
        const data = await fetch("http://iabeta.in/abhishek/api/re.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache"
        })
        const stores = await data.json();
        // console.log("api data=>", stores);

        return Response.json(stores);
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Error in Get invite-records",
            },
            { status: 500 }
        );
    }
}