interface PostCardProps {
    post: {
        id: string
        userId: string
        userName: string
        userAvatar?: string
        content: string
        images?: string[]
        video?: string
        link?: string
        timestamp: string
        likes: string[]
        comments: Array<{
            id: string
            userId: string
            userName: string
            userAvatar?: string
            content: string
            timestamp: string
            likes: string[]
        }>
        shares: number
    }
}