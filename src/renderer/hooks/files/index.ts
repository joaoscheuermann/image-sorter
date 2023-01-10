import { useState } from 'react';

export default function useGroupedFileStore(types: RegExp[]) {
  const [currentFiles, setCurrentFiles] = useState({});

  function add(fileList?: FileList) {
    if (!fileList) return;

    // eslint-disable-next-line prettier/prettier
    const validFiles = Array
      .from(fileList)
      .filter((file: File) => types.some((type) => type.test(file.type)));

    console.log(validFiles);
  }

  function remove() {}

  return { add, remove };
}
