type TypedArray =
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

// Node.js Buffer values are also JavaScript Uint8Array and TypedArray instances;
// see https://nodejs.org/api/buffer.html#buffer_buffers_and_typedarrays.
export default (
  buffers: (TypedArray | ArrayBufferLike | ArrayLike<number>)[],
  totalLength = buffers.reduce(
    (sum, buf) => sum + ("byteLength" in buf ? buf.byteLength : buf.length),
    0
  )
): Uint8Array => {
  const result = new Uint8Array(totalLength);

  let offset = 0;
  for (const buf of buffers) {
    const u8Buf = ArrayBuffer.isView(buf)
      ? new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength)
      : new Uint8Array(buf);
    result.set(u8Buf, offset);
    offset += u8Buf.byteLength;
  }
  return result;
};
