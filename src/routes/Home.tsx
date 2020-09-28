import { dbService } from 'fbase';
import React, { useState, useEffect } from 'react';
import Nweet from 'components/Nweet';
interface HomeProps {
  userObj?: firebase.User;
}
const Home: React.FC<HomeProps> = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState<any>([]);

  useEffect(() => {
    dbService.collection('jweets').onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dbService.collection('jweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj?.uid,
    });
    console.log(userObj?.uid);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>

      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet: any) => (
        //   <Nweet
        //     key={nweet.id}
        //     nweetObj={nweet}
        //     isOwner={nweet.creatorId === userObj.uid}
        //   />
        ))}
      </div>
    </div>
  );
};
export default Home;
