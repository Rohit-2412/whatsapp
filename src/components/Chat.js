import { auth, db } from "../../firebase"

import { Avatar } from "@mui/material"
import getRecipientEmail from "@/utils/getRecipientEmail"
import { toUpper } from "lodash"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { useRouter } from "next/router"

const Chat = ({ id, users }) => {
    const [user] = useAuthState(auth)
    const recipientEmail = getRecipientEmail(users, user)
    const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", recipientEmail))

    const recipient = recipientSnapshot?.docs?.[0]?.data();

    // creating router instance
    const router = useRouter();
    // enter chat

    const enterChat = () => {
        // go to messages page
        // router.push(`/chat/${id}`)
        router.replace(`/chat/${id}`)
    }

    return (
        <div
            onClick={enterChat}
            className="flex flex-row items-center px-2 py-1 hover:bg-[#e9eaeb] cursor-pointer relative"
        >
            {/* user avatar */}
            <div className="m-2 mr-4">
                {
                    recipient ? (
                        <Avatar
                            src={recipient?.photoURL}
                        />) : (
                        <Avatar>
                            {toUpper(recipientEmail[0])}
                        </Avatar>
                    )
                }
            </div>
            {/* email */}
            <h1 className="break-normal">{recipientEmail}</h1>
        </div>
    )
}

export default Chat