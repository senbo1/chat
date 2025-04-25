import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@chat/ui/components/tabs';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

export default function ChatTabs() {
  return (
    <Tabs defaultValue="create-room" className="w-[400px] px-2">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="create-room">Create Room</TabsTrigger>
        <TabsTrigger value="join-room">Join Room</TabsTrigger>
      </TabsList>
      <TabsContent value="create-room">
        <CreateRoom />
      </TabsContent>
      <TabsContent value="join-room">
        <JoinRoom />
      </TabsContent>
    </Tabs>
  );
}
