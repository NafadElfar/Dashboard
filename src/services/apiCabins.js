import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins couldn't be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("cabins couldn't be created");
  }
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      const { error: deleteError } = await supabase
        .from("cabins")
        .delete()
        .eq("id", data.id);
      console.error(storageError);
      throw new Error(
        "cabin image couldn't be uploaded and the cabin wasn't created",
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabins couldn't be loaded");
  }
  return data;
}

const { data, error } = await supabase
  .from("cabins")

  .select();

/*
https://gvwgqpabrlnmblczrkbj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
https://gvwgqpabrlnmblczrkbj.supabase.co/storage/v1/object/public/cabin-images/0.2817854237119076-undefined 
   */
