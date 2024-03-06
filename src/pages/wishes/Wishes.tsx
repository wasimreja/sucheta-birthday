import "./Wishes.css";

import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { usePalette } from "@roylee1997/react-palette";

import Progress from "../../components/Progress/Progress";
import MusicCard from "../../components/MusicCard/MusicCard";
import TMessagesData from "../../typings/MessagesData";

// albumArts
import firstAlbumArt from "../../assets/albumArts/unicorn-and-the-sheep.png";
import secondAlbumArt from "../../assets/albumArts/tu-aisa-kaise-hai.png";

// musicFilePaths
import firstMusic from "../../assets/music/unicorn-and-the-sheep.mp3";
import secondMusic from "../../assets/music/tu-aisa-kaise-hai.mp3";

// framer transition and variants
const commonTransition = {
  ease: [0.43, 0.13, 0.23, 0.96],
  duration: 0.5,
};

const messageContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
      duration: 0.5,
    },
  },
};

const messages = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const sampleMessagesDataArray: TMessagesData[] = [
  {
    albumArt: firstAlbumArt,
    musicName: "Unicorn and the Sheep - Raghav Meattle",
    messageInParas: [
      "Sucheta, Happy Birthday, beautiful soul.",
      "Another year older, and you're still as dazzling as ever. May your day be filled with giggles, sweet treats and endless joy. Just like cupcake with sprinkles, your presence adds a sprinkle of happiness to my life.",
      "You’re so bubbly, constantly smiling and talking brightly. You possess a soft mushy nature and pure innocence. You know me to my core. You know what makes me smile and what ticks me off. If I am going through something, you are the first person to text me to make sure I am okay. Thank you for making me feel ‘home’ even though we are miles apart.",
      "And remember, no matter where life takes us, I'll always be here for you. You're my friend to the end.",
    ],
    musicFilePath: firstMusic,
  },
  {
    albumArt: secondAlbumArt,
    musicName: "Tu Aisa Kaise Hai - Osho Jain",
    messageInParas: [
      "On your birthday, I want you to know just how much you mean to me. You’re the most amazing and warm person I have ever come across.",
      "We just click, you know? From deep talks to laughing at the dank memes, you get me in a way no one else does. You're always there to listen to my nonsense, and you never judge. Thanks for being my ride-or-die and the best friend anyone could ask for.",
      "You're the immensely beautiful part of my life I yearn to keep hold of forever. It's not easy for me to express such vulnerability, but you're worth every word.",
      "Oh, and don't forget our promise – if we're both still single by 40, let’s get married. Deal?",
    ],
    musicFilePath: secondMusic,
  },
];

const Wishes = () => {
  const navigate = useNavigate();
  const { id = 0 } = useParams();

  if (Number(id) < 0 || sampleMessagesDataArray[Number(id)] == undefined) {
    return <p>Invalid Wish Message Id</p>;
  }

  const {
    data: colorData,
    loading: colorDataIsLoading,
    error,
  } = usePalette(sampleMessagesDataArray[Number(id)].albumArt);

  if (error) {
    return <h1>Invalid Wish Message Id</h1>;
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      className="wishes-wrapper h-screen w-screen flex flex-col justify-between items-center"
    >
      <Progress
        primaryColor={colorData?.vibrant}
        secondaryColor={colorData?.darkVibrant}
        messageDataArrayLength={sampleMessagesDataArray.length}
      />
      <motion.div
        className="lg:w-11/12 rounded-t-2xl md:rounded-t-xl flex md:flex-row flex-col-reverse"
        style={{
          backgroundColor: colorDataIsLoading ? "#fff" : colorData?.vibrant,
        }}
        initial={{ y: "1000px" }}
        animate={{ y: "0px" }}
        exit={{ y: "1000px" }}
        transition={commonTransition}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) {
            if (Number(id) > 0 && Number(id) < sampleMessagesDataArray.length) {
              navigate(`/wishes/${Number(id) - 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else if (info.offset.x < -50) {
            if (
              Number(id) >= 0 &&
              Number(id) < sampleMessagesDataArray.length - 1
            ) {
              navigate(`/wishes/${Number(id) + 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else {
            console.log(null);
          }
        }}
      >
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          animate="show"
          variants={messageContainer}
        >
          {sampleMessagesDataArray[Number(id)].messageInParas.map(
            (eachPara, index) => {
              return (
                <motion.p
                  className="p-8 message text-3xl"
                  variants={messages}
                  key={index + 2045}
                >
                  {eachPara}
                </motion.p>
              );
            }
          )}
        </motion.div>
        <div className="md:w-1/2 h-1/2 md:h-auto flex justify-center items-center">
          <MusicCard
            albumArt={sampleMessagesDataArray[Number(id)].albumArt}
            primaryColor={colorData?.vibrant}
            musicName={sampleMessagesDataArray[Number(id)].musicName}
            musicFilePath={sampleMessagesDataArray[Number(id)].musicFilePath}
          />
        </div>
      </motion.div>
    </motion.main>
  );
};

export default Wishes;
