import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string
    const userId = formData.get("userId") as string
    const userName = formData.get("userName") as string

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 })
    }

    // Create user folder name (sanitized)
    const userFolderName = userName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

    // Get file extension
    const fileExtension = file.name.split(".").pop() || "jpg"

    // Create filename based on type
    const fileName = type === "avatar" ? `profile-image.${fileExtension}` : `banner-image.${fileExtension}`

    // Create user directory path
    const userDir = join(process.cwd(), "public", "users", userFolderName)

    // Create directory if it doesn't exist
    if (!existsSync(userDir)) {
      await mkdir(userDir, { recursive: true })
    }

    // Full file path
    const filePath = join(userDir, fileName)

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Write file to disk
    await writeFile(filePath, buffer)

    // Return the public URL path
    const imagePath = `/users/${userFolderName}/${fileName}`

    return NextResponse.json({
      success: true,
      imagePath,
      message: `${type === "avatar" ? "Profile image" : "Banner image"} uploaded successfully`,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
