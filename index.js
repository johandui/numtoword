const arr = x => Array.from(x);
const num = x => Number(x) || 0;
const str = x => String(x);
const isEmpty = xs => xs.length === 0;
const take = n => xs => xs.slice(0, n);
const drop = n => xs => xs.slice(n);
const reverse = xs => xs.slice(0).reverse();
const comp = f => g => x => f(g(x));
const not = x => !x;
const chunk = n => xs =>
  isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];

let numToWords = n => {
  return convert(parseInt(n));
};
let convert = n => {
  let a = [
    "",
    "нэг",
    "хоёр",
    "гурав",
    "дөрөв",
    "тав",
    "зургаа",
    "долоо",
    "найм",
    "ес",
    "арав",
    "арван нэг",
    "арван хоёр",
    "арван гурав",
    "арван дөрөв",
    "арван тав",
    "арван зургаа",
    "арван долоо",
    "арван найм",
    "арван ес"
  ];
  let ab = [
    "",
    "нэг",
    "хоёр",
    "гурван",
    "дөрвөн",
    "таван",
    "зургаан",
    "долоон",
    "найман",
    "есөн",
    "арван",
    "арван нэгэн",
    "арван хоёр",
    "арван гурван",
    "арван дөрвөн",
    "арван таван",
    "арван зургаан",
    "арван долоон",
    "арван найман",
    "арван есөн"
  ];

  let b = ["", "", "хорь", "гуч", "дөч", "тавь", "жар", "дал", "ная", "ер"];

  let g = [
    "",
    "мянга",
    "сая",
    "тэрбум",
    "их наяд",
    "маш дэлгэмэл",
    "тунамал",
    "ингүүмэл",
    "хямралгүй",
    "ялгаруулагч",
    "өвөр дээр",
    "хөөн удирдагч",
    "хязгаар үзэгдэл ",
    "шалтгааны зүйл",
    "үзэсгэлэнт гэрэлт",
    "эрхэт",
    "сайтар хүргэсэн",
    "онон одох",
    "живэх тоосон",
    "бэлэг тэмдэг",
    "хүчин нөхөр",
    "дохио мэдэхүй",
    "тийн болсон",
    "хүчин нүдэн",
    "асрангуй",
    "нигүүлсэнгүй",
    "баясангуй",
    "тэгш",
    "тоомьгүй",
    "хэмжээлшгүй",
    "цаглашгүй",
    "өгүүлшгүй",
    "хирлэшгүй",
    "үлэшгүй",
    "үлэж дуусашгүй",
    "сэтгэшгүй"
  ];
  let joinmaker = ten => {
    if (ten == 3 || ten == 4) return b[ten] + "ин";
    if (ten == 5 || ten == 2)
      return b[ten].substring(0, b[ten].length - 1) + "ин";
    if (ten == 6 || ten == 7 || ten == 8) return b[ten] + "ан";
    if (ten == 9) return b[ten] + "эн";
  };

  let makeGroup = ([ones, tens, huns], e) => {
    return [
      num(huns) === 0
        ? ""
        : e == 0 && num(tens) == 0 && num(ones) === 0
        ? ab[huns] + " зуу "
        : ab[huns] + " зуун ",
      num(ones) === 0
        ? e == 0
          ? b[tens]
          : joinmaker(tens)
        : (b[tens] && joinmaker(tens) + " ") || "",
      a[tens + ones] ? (e == 0 ? a : ab)[tens + ones] : (e == 0 ? a : ab)[ones]
    ].join("");
  };
  let joincheck = group => {
    return group;
  };

  let thousand = (group, i) =>
    group === "" ? group : `${joincheck(group)} ${g[i]}`;

  if (typeof n === "number") return convert(String(n));
  else if (n === "0") return "тэг";
  else
    return comp(chunk(3))(reverse)(arr(n))
      .map(makeGroup)
      .map(thousand)
      .filter(comp(not)(isEmpty))
      .reverse()
      .join(" ");
};

export default numToWords;
