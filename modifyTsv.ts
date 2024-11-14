import * as fs from "fs";
import * as readline from "readline";

const inputFilePath = "../../elastic search/addresses.tsv"; // Change to your input file path
const outputFilePath = "../../elastic search/addresses_id_added.tsv"; // Change to your desired output file path

const processFile = async () => {
  const inputStream = fs.createReadStream(inputFilePath);
  const outputStream = fs.createWriteStream(outputFilePath);

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  let id = 1; // Start ID from 1

  // Write the new header
  outputStream.write(`ID\tAddress\tBalance\n`);

  for await (const line of rl) {
    // Split the line into columns
    const columns = line.split("\t");
    // Append the ID as the first column
    const newLine = `${id}\t${columns.join("\t")}\n`;
    outputStream.write(newLine);
    id++;
  }

  outputStream.end();
  console.log("File processing completed.");
};

processFile().catch(console.error);
