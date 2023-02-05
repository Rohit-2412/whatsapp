import { auth } from "../../firebase";
import moment from "moment/moment";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ user, message }) => {
    const [userLoggedIn] = useAuthState(auth);

    // function to check determine the type of message

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

    return (
        <Container>
            <TypeOfMessage>{message.message}
                <Time>
                    {message.timestamp ? moment(message.timestamp).format('LT') : "..."}
                </Time>
            </TypeOfMessage>

        </Container>
    )
}

export default Message

const Container = styled.div``

const MessageElement = styled.p`
    width: fit-content;
    padding: 15px;
    border-radius: 8px;
    margin: 5px;
    min-width: 80px;
    padding-bottom: 20px;
    position: relative;
    text-align: right;
    `

const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: #dcf8c6;
    `
const Reciever = styled(MessageElement)`
    text-align: left;
    background-color: whitesmoke;
    `

const Time = styled.p`
    color: gray;
    padding: 10px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
    `