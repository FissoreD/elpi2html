function* counter() {
  let i = 0;
  while (true) {
    yield i; i++;
  }
}

export function listNoDup<A>(l: A[]) {
  let s = new Set<A>()
  let res : A[] = [] 
  l.forEach(e => { if (!s.has(e)) { s.add(e); res.push(e) } })
  return res
}

export function filePathFromTitle(title: string) {
  return title.split("\"")[1]
}

export const IntGenerator = counter()
