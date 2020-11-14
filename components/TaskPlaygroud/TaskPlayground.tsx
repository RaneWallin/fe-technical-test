import * as React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_AUDIO = gql`
  query($id: ID!) {
    audio(id: $id) {
      id
      title
      file
      annotations {
        startTime
        endTime
      }
  }
}
`;

const TaskPlayground = () => {
  const { loading, error, data } = useQuery(GET_AUDIO, {
    variables: { id: "papercup"}
  });
  return (
    <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full my-10">
      <div className="max-w-md flex flex-col items-center mx-auto">

        { data && console.log("Data", data) }
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5 mt-12">
          ⚠
        </h2>
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          Heads up
        </h2>
        <p>
          WaveSurfer is a great library and Next.js is great framework, but
          together they havee small issue. Next.js renders all the code on
          server side first, and then hydrates it on the front-end. This works
          great to generated static parts of the website, and if it detects the
          website has no dynamic elements, it will generate a static page. This
          causes a small problem when rendering , since it is not
          designed specifically for server side rendering, we can an error when
          trying to import it. To get around the issue, we can import the
          modules when the component is mounted or when window is available.{" "}
          <br /> <br />
          Example code: <br />
        </p>
        <img src="/assets/warning.png" />
        <p>
          The above code can be surround with a if statement for window or
          handled on mount. Once the page is hydrated on the client-side, you
          can import the module and start using it.
        </p>
      </div>
    </div>
  );
};

export default TaskPlayground;
