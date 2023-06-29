import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

// Feedback component to display a status message.
const Feedback: React.FC<{ status: string }> = ({ status }) => (
  <div>
    {status === "SUCCESS" && <p>Thanks!</p>}
    {status === "ERROR" && <p>Ooops! There was an error.</p>}
  </div>
);

const IndexPage: React.FC<PageProps> = () => {
  const [statusCode, setStatusCode] = React.useState("");
  const onClick = async () => {
    try {
      const response = await fetch(
        "https://api.netlify.com/build_hooks/649dfe310fc52a3ac23afb98",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (response.status === 200) {
        setStatusCode("SUCCESS");
        return;
      }

      throw new Error(
        `Error! HTTP Status: ${response.status} ${response.statusText}}`
      );
    } catch (err) {
      setStatusCode("ERROR");
      console.log(err);
    }
  };

  return (
    <main style={pageStyles} className="bg-blue-800">
      <button onClick={onClick}>Trigger Rebuild</button>
      <Feedback status={statusCode} />
    </main>
  );
};

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
