import { json, LoaderFunction } from "@remix-run/node";
import { mongodb } from "~/utils/db.server";

export let action: LoaderFunction = async ({ request }) => {
  const data = await request.json();
  const { question, options, answer } = data;

  const db = await mongodb.db("sample_mflix");
  const collection = db.collection("draggable_data");

  const alreadyExists = await collection.findOne({question});
  if(alreadyExists){
    return json({ success: true })
  }

  await collection.insertOne({
    question,
    options,
    answer,
    timestamp: new Date(),
  });

  return json({ success: true });
};
