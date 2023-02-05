import * as EmailValidator from "email-validator";

import { Avatar, Button, IconButton } from "@mui/material";
import { Chat, MoreVertOutlined, Search } from "@mui/icons-material";

import React from "react";

const Sidebar = () => {

    const createChat = () => {
        const input = prompt("Please enter an email address for the user you wish to chat with");

        if (!input) return null;
        // validate email
        if (EmailValidator.validate(input)) {
            // add the chat 'chats' in the database
        }
        // do some clever database stuff...
    }

    return (
        <div>
            {/* header */}
            <header className="flex sticky top-0 bg-white z-1 justify-between items-center p-2 h-[80] border-b-2 border-gray-200">
                <IconButton>
                    <Avatar className="cursor-pointer hover:opacity-80" />
                </IconButton>

                {/* icon container */}
                <div>
                    <IconButton>
                        <Chat />
                    </IconButton>

                    <IconButton>
                        <MoreVertOutlined />
                    </IconButton>
                </div>
            </header>

            {/* search container */}
            <div className="flex items-center p-4 rounded-sm">
                <Search />
                <input
                    className="flex-1 ml-2 outline-none border-none"
                    type="text" placeholder="Search chat" />
            </div>

            {/* start new chat */}
            <div className="border-y border-y-gray-200">
                <Button
                    onClick={createChat}
                    className="w-full ">
                    Start a new chat
                </Button>
            </div>

            {/* list of chats */}
        </div>
    );
};

export default Sidebar;
