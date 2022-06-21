import "./App.css";
import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";

const client = StreamChat.getInstance("fmsapnk8c76u");

function App() {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    (async () => {
      await client.setGuestUser({
        id: String(Math.floor(Math.random() * Date.now())),
        name: "Anonymous",
      });
      const channel = await client.channel("tinubee", "three", {
        name: "Third Channel",
      });
      setChannel(channel);
      console.log(client);
    })();
    return () => {
      client.disconnectUser();
    };
  }, []);
  return (
    <Chat client={client}>
      <ChannelList />
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}

export default App;
