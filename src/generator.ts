function* counter() {
  let i = 0;
  while (true) {
    yield i; i++;
  }
}

const IntGenerator = counter();

export default IntGenerator