import { open } from "fs/promises";

class File {
  name: string;
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

class Folder extends File {
  files: (File | Folder)[];
  parent?: Folder;

  constructor(name: string, files: File[] = [], parent?: Folder) {
    const totalSize = files.reduce(
      (totalSize, file) => totalSize + file.size,
      0
    );
    super(name, totalSize);
    this.files = files;
    this.parent = parent;
  }

  addFile = (file: File) => {
    if (file instanceof Folder) file.parent = this;
    this.files.push(file);
    this.changeSize(file.size);
  };

  changeSize = (change: number) => {
    this.size += change;
    if (this.parent) this.parent.changeSize(change);
  };
}

async function readFile() {
  const lines: string[] = [];
  const file = await open("./2022/7/input.txt");
  for await (const line of file.readLines()) {
    lines.push(line);
  }
  return lines;
}

function addFileToCursor(cursor: Folder, args: string[]) {
  const name = args[1];
  if (args[0] === "dir") {
    const newFolder = new Folder(name, [], cursor);
    cursor.addFile(newFolder);
    return;
  }

  const size: number = parseInt(args[0]);
  if (Number.isNaN(size)) throw new Error("Expected integer size.");
  const newFile = new File(name, size);
  cursor.addFile(newFile);
}

/** Recursively print file tree */
function printFileTree(currentFile: Folder | File, depth: number) {
  const fileName = "-".repeat(depth) + currentFile.name;
  const isFolder = currentFile instanceof Folder;
  console.log(fileName + (isFolder ? "/" : "") + ` size=${currentFile.size}`);

  if (isFolder) {
    currentFile.files.forEach((file) => printFileTree(file, depth + 1));
  }
}

function findClosestThresholdSize(currentFolder: Folder, threshold: number) {
  let closestSize = Number.MAX_SAFE_INTEGER;
  const childFolders = currentFolder.files.filter(
    (file) => file instanceof Folder
  ) as Folder[];

  childFolders.forEach((folder) => {
    const tempSize = findClosestThresholdSize(folder, threshold);
    if (tempSize < closestSize && tempSize >= threshold) closestSize = tempSize;
  });

  if (currentFolder.size < closestSize && currentFolder.size >= threshold)
    closestSize = currentFolder.size;

  return closestSize;
}

async function main() {
  const lines = await readFile();
  const root = new Folder("root");
  let cursor = root;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Assume any line that does not start with $ is a result of 'ls' command
    if (!line.startsWith("$")) {
      addFileToCursor(cursor, line.split(" "));
    }

    // First element would be '$'
    const [_, command, target] = line.split(" ");
    if (command === "cd") {
      if (target === "..") {
        cursor = cursor.parent!;
        continue;
      }
      const targetFile = cursor.files.find((file) => file.name === target);

      if (!targetFile) {
        // If there is no target file, create a new empty folder and place cursor in it
        const emptyFolder = new Folder(target, [], cursor);
        cursor.addFile(emptyFolder);
        cursor = emptyFolder;
        continue;
      }
      if (targetFile instanceof Folder) cursor = targetFile;
      else throw new Error("cd target is not a folder");
    }

    // TODO: Add 'ls' command handling for error checks
  }

  const totalSpace = 70000000;
  const neededSpace = 30000000;
  const threshold = neededSpace - (totalSpace - root.size);

  printFileTree(root, 1);
  console.log(findClosestThresholdSize(root, threshold));
}

main();
