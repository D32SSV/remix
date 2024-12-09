import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { mongodb } from "~/utils/db.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  
  // Get the form values
  const title = formData.get("title")?.toString();
  const option1 = formData.get("option 1")?.toString();
  const option2 = formData.get("option 2")?.toString();
  const option3 = formData.get("option 3")?.toString();
  const option4 = formData.get("option 4")?.toString();

  // Create the movie object to be inserted into DB
  const question = {
    title,
    options: [option1, option2, option3, option4],
  };

  // Connect to MongoDB and get the collection
  const db = await mongodb.db("sample_mflix");
  const collection = await db.collection("questions"); // Use a different collection for questions

  // Insert the document into MongoDB
  await collection.insertOne(question);

  // Redirect after submission
  return redirect("/movies"); // Redirect to the movies page after submission
}

export default function Index() {
  return (
    <>
      <h2>Add a Question</h2>
      <section className="flex gap-2 justify-center items-center bg-slate-400 p-3">
        <Form method="POST" action="/movies/add" className="flex gap-2 flex-col bg-gray-600">
          {/* Input for the Question Title */}
          <input 
            type="text" 
            name="title" 
            placeholder="Question" 
            required
          />
          {/* Inputs for the Options */}
          <input 
            type="text" 
            name="option 1" 
            placeholder="Option 1" 
            required
          />
          <input 
            type="text" 
            name="option 2" 
            placeholder="Option 2" 
            required
          />
          <input 
            type="text" 
            name="option 3" 
            placeholder="Option 3" 
            required
          />
          <input 
            type="text" 
            name="option 4" 
            placeholder="Option 4" 
            required
          />
          <button type="submit">
            Add
          </button>
        </Form>
        <div className="bg-slate-500 w-[40vw] h-[80vh]">
          {/* Optional, additional content here */}
        </div>
      </section>
    </>
  );
}
