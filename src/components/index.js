import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/44/9e/05/449e058844d89d45822a44c9f5f60fe2.gif')",
        width: "100%",
        height: "100vh",
        backgroundRepeat: 'no-repeat',
        margin:'0 auto',
        backgroundPosition:'center'
      }}
    >
      LOADING...
    </div>
  );
}
