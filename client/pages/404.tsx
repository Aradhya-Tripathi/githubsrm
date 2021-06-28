import { motion, AnimatePresence } from "framer-motion";
import { ErrorPage, Meteor } from "../utils/icons";
import { Layout } from "../components/shared/index";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const NotFound = () => {
  const router = useRouter();

  const [vis, setVis] = useState(true);

  const randInt = () => Math.floor(Math.random() * 100);

  const ani = {
    initial: () => {
      return {
        opacity: 0,
        x: 500 + randInt(),
        y: -500 + randInt(),
        scale: Math.random() + 0.1,
      };
    },
    animate: () => {
      return { opacity: 1, x: -400 + randInt(), y: 400 + randInt() };
    },
  };

  const getMeteors = () => {
    const meteors = [];
    for (var i = 0; i < 3; i++) {
      meteors.push(
        <motion.div
          className="w-24 h-24"
          initial="initial"
          animate="animate"
          transition={{ delay: Math.random() }}
          variants={ani}
          exit={{ opacity: 0 }}
          key={i}
        >
          <Meteor />
        </motion.div>
      );
    }
    return meteors;
  };

  // useEffect(() => {
  //   setInterval(() => router.push("/"), 50000);
  // });

  useEffect(() => {
    setTimeout(() => {
      setVis(false);
    }, 1700);
  });

  return (
    <Layout>
      <div className="w-full relative mx-auto h-full text-black">
        <div className=" h-full flex flex-row lg:flex-col text-2xl justify-center items-center">
          <motion.span>
            We can't find this Page :( <br /> Redirecting you now!
          </motion.span>
          <AnimatePresence>{vis && getMeteors()}</AnimatePresence>
          <motion.div
            transition={{ ease: "circIn" }}
            animate={{ x: "60%" }}
            className="absolute w-1/2"
          >
            <ErrorPage />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
