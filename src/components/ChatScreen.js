import { AttachFile, InsertEmoticon, Mic, MoreVert } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { auth, db } from "../../firebase";
import { useRef, useState } from "react";

import Message from "./Message";
import TimeAgo from "timeago-react";
import firebase from "firebase";
import getRecipientEmail from "@/utils/getRecipientEmail";
import styled from "styled-components";
import { toUpper } from "lodash";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

function ChatScreen({ chat, messages }) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [input, setInput] = useState('')
    const endOfMessageRef = useRef(null)

    const [messageSnapshot] = useCollection(
        db
            .collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
    );

    const recipientEmail = getRecipientEmail(chat.users, user);
    const [recipientSnapshot] = useCollection(
        db
            .collection("users")
            .where("email", "==", recipientEmail)
    );

    const recipient = recipientSnapshot?.docs?.[0]?.data();

    // function to scroll to bottom

    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    const showMessages = () => {
        if (messageSnapshot) {
            return messageSnapshot.docs.map(message =>
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />);
        }
        else {
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.user} message={message} />
            ))
        }
    };

    // function to send message
    const sendMessage = (e) => {
        e.preventDefault();
        // update last seen
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });

        // add message to db
        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        scrollToBottom();
        setInput("");
    }

    return (
        <div className="h-screen bg-slate-100">
            {/* header */}
            <div className="sticky top-0 h-[80] bg-white z-10 flex p-3  items-center border-b-2 border-[#eaebea]">
                {
                    recipient ? (
                        <Avatar
                            src={recipient?.photoURL}
                            className="mr-3"
                        />
                    ) : (
                        <Avatar className="mr-3">
                            {toUpper(recipientEmail[0])}
                        </Avatar>
                    )

                }
                {/* header information */}
                <div className="ml-[50] flex-1 items-center justify-center">
                    <p className="font-bold text-base mb-[3]">
                        {/* show only 20 characters */}
                        {
                            recipientEmail.split('@')[0].length > 20 ?
                                recipientEmail.split('@')[0].substring(0, 20) + "..." :
                                recipientEmail.split('@')[0]
                        } </p>
                    {
                        recipientSnapshot ? (
                            <p className="text-xs text-[#8a8a8a]">
                                Last active: {" "}
                                {
                                    recipient?.lastSeen?.toDate() ? (
                                        <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                                    ) : "Unavailable"
                                }
                            </p>
                        ) : (
                            <p className="text-[#8a8a8a]">Loading last active...</p>
                        )
                    }
                </div>

                {/* header icons */}
                <div>
                    <IconButton>
                        <AttachFile />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            {/* message container */}
            <div className="p-7 bg-[#e5ded8] min-h-[90vh]">
                {/* message */}
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef} />
            </div>

            {/* footer */}

            {/* input container */}
            <form
                onSubmit={sendMessage}
                className="flex items-center p-[10] sticky bottom-0 bg-white z-10">
                {/* insert emoticon */}
                <IconButton>
                    <InsertEmoticon />
                </IconButton>

                {/* input tag */}
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 items-center outline-0 border-none p-3 sticky bg-gray-50 mx-2"
                    type="text" placeholder="Type a message" />

                {/* mic icon */}
                <IconButton>
                    <button type="submit" hidden disabled={!input}
                    >
                        Send Message
                    </button>
                    <Mic />
                </IconButton>
            </form>
        </div>
    );
}

export default ChatScreen;

const EndOfMessage = styled.div`
    margin-bottom: 50px;`