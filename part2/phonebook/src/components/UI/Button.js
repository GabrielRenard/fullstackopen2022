import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const Button = forwardRef((props, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={props.type || "button "}
      onClick={props.onClick}
      className={`${props.className}`}
    >
      {props.children}
    </motion.button>
  );
});

export default Button;
