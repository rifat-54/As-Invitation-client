"use server"

export const createToken=async(email:string)=>{
    const res=await fetch(`${process.env.BACKEND_URL}/api/v1/token/get-token`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email})
    })
    const data=await res.json()
    return data
}


export const getAllTokens=async()=>{
    const res=await fetch(`${process.env.BACKEND_URL}/api/v1/token/all-token`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data=await res.json()
    return data
}


export const updateTokenStatus = async (
    id: string,
    isValid: boolean
) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/api/v1/token/uptoken-status/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isValid }),
        }
    );

    if (!res.ok) {
        throw new Error("Failed to update token status");
    }

    return await res.json();
};



export const getTokenInfo = async (value: string) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/api/v1/token/tokeninfo/${encodeURIComponent(value)}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Token information not found");
    }

    return await res.json();
};

export const addLink = async (link: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/v1/invite/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link:link }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add link");
    }

    return data;
  } catch (error) {
    console.error("Add Link Error:", error);

    throw error;
  }
};