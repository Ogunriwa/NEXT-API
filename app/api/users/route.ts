
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sql } from '@vercel/postgres'

const prisma = new PrismaClient()

// POST ROUTE

export async function POST(request: NextRequest) {
  const {email, password } = await request.json();

  // Validate Input data

  if (!email) {
    return NextResponse.json(
      {message: "Input email and name"}, 
      {status: 400})
  }

        try {
            const newUseruser = await prisma.user.create({
                data: {
                    
                    email, password
                },
            });
          return NextResponse.json(newUseruser, {status: 201});
        } catch (error) {
            console.error("Error creating user", error);
            return NextResponse.json({ error: "Failed to create user" }, {status: 500});
        }
}



// GET METHOD
export async function GET() {

    try {
      const {rows: users} = await sql `SELECT * FROM "User"`;
      return NextResponse.json(users, {status: 200});
    }

    catch(error) {
      console.error("Error fetching users:", error)
      return NextResponse.json ({message: "internal Server Error"}, {status: 500})

    }
}



// PUT METHOD

export async function PUT(request: NextRequest) {

  try {
    const { name, email, password} = await request.json()

    if  (!name || !email) {
      return NextResponse.json({message: "One field needs to be inputted"}, {status: 400})
    }

    const { rowCount } = await sql `UPDATE "User" SET name = COALESCE(${name},name), password= COALESCE(${password}) WHERE name = ${name} RETURNING *`

    if (rowCount === 0) {

      return NextResponse.json({
        message: "User not found no changes made"
      },
      {
        status: 404
      })
    }

    return NextResponse.json(
      {
        message: "User updated successfully"
      },
      {
        status: 200
      }
    )


  }

  catch(error) {
    console.error('Internal Sever Error', error)
    return NextResponse.json({message: "Internal Server Error "}, {status: 500})
  }

}


// PATCH METHOD

export async function PATCH(request: NextRequest) {

  try {

    const {name, password} = await request.json()

    if(!name|| !password) {
      return NextResponse.json({message: "One field needs to be inputted"}, {status: 404})
    }

    const rowResult = await sql `UPDATE "User" SET password = ${password} WHERE name = ${name} RETURNING * `


    if (rowResult.rows.length === 0) {
      return NextResponse.json({
        message: "User not found"
      },
      {
        status: 404
      })
    }

    return NextResponse.json(
      {
        message: "Password saved successfully"
      },
      {
        status: 200
      }
    )

  }

  catch(error) {

    console.error("Error updating password", error)
    return NextResponse.json({message: "Internal Server Error "}, {status: 500})
  }

}