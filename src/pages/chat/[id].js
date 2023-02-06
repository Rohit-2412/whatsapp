import { auth, db } from "../../../firebase"

import ChatScreen from "@/components/ChatScreen"
import Head from "next/head"
import Sidebar from "@/components/Sidebar"
import getRecipientEmail from "@/utils/getRecipientEmail"
import { useAuthState } from "react-firebase-hooks/auth"

const Chat = ({ chat, messages }) => {
    const { user } = useAuthState(auth)

    console.log(chat, messages)
    return (
        <div
            className="flex h-screen"
        >
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            </Head>
            <Sidebar />

            {/* chat container */}
            <div className="flex-1 overflow-scroll h-screen
                scrollbar-hide"
            >
                {/* chat screen */}
                <ChatScreen chat={chat} messages={messages} />
            </div>
        </div>
    )
}

export default Chat

export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id)

    // PREP the messages on the server
    const messagesRes = await ref
        .collection("messages")
        .orderBy("timestamp", "asc")
        .get()

    const messages = messagesRes.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        .map((messages) => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime(),
        }))

    // PREP the chats
    const chatRes = await ref.get()
    const chat = {
        id: chatRes.id,
        ...chatRes.data(),
    }

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }
}
