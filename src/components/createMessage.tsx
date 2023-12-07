import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const CreateMessage = (): JSX.Element => {
    const [content, setContent] = useState<string>('');

    return (
        <>
            <div className="sendNewMessage">
                <button className="addFiles">
                    <i className="fa fa-plus"></i>
                </button>
                <input
                    type="text"
                    placeholder="Ecrire ici"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setContent(e.target.value)
                    }
                />
                <button className="btnSendMsg" id="sendMsgBtn">
                    <FaPaperPlane />
                </button>
            </div>
        </>
    );
};

export default CreateMessage;
