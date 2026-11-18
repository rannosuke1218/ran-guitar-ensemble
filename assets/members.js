/* メンバーの情報。空欄("")のところは、ページに「準備中」の枠が出ます。
   分かったら "" の中に書き足すだけでOK。
   career は実績を1行ずつ。message はプロフィールの文。instagram / youtube / tiktok / x は、アカウントのURLをそのまま貼る。
   photo は img フォルダに写真を入れて "img/ファイル名.jpg" と書く（無ければロゴが出ます）。
   並びは 主宰 → 高い音のパートから低い音のパートへ。 */
window.MEMBERS = [
  {
    id: "ran",
    name: "秋山 嵐之輔",
    roman: "Rannosuke Akiyama",
    role: "主宰・編曲",
    part: "アルト1・プライム1・プライムチェンバロ",
    photo: "img/classical.jpg",
    career: [
      "第57回 全日本ギターコンクール 独奏部門 第2位",
      "JGA ギター合奏コンクール 3年連続金賞（山梨県立北杜高等学校）",
      "Bグループ コンサートマスター"
    ],
    message: "",
    /* ライブ（個人の活動。このメンバーの個人ページにだけ出る） */
    live: { photo: "img/live.jpg", alt: "ライブで歌う秋山嵐之輔", text: "クラシックギターのほか、バンドのステージにも立っています。" },
    instagram: "",
    youtube: "",
    tiktok: "",
    x: ""
  },
  {
    id: "shoda", name: "荘田 和眞", roman: "Kazuma Shoda", role: "", part: "ソプラノ・アルト2",
    photo: "img/shoda.jpg", photoPos: "62% 10%",
    career: [
      "第47回 全日本学生ギターフェスティバル 重奏部門 特別金賞",
      "第47回 全日本学生ギターフェスティバル 合奏部門 最優秀賞",
      "第48回 全日本学生ギターフェスティバル 重奏部門 特別金賞",
      "第50回 全日本学生ギターフェスティバル 独奏部門 最優秀賞"
    ],
    message: "", instagram: "https://www.instagram.com/sansyoku.dangok", youtube: "", tiktok: "", x: "" },
  {
    id: "maruyama", name: "圓山 樹輝", roman: "Itsuki Maruyama", role: "", part: "プライム",
    photo: "img/maruyama.jpg", photoPos: "54% 26%",
    career: [
      "JGA ギター合奏コンクール 3年連続金賞（高校時代）"
    ],
    message: "16歳でギターに出会い、高校生時代はJGAギター合奏コンクールにて3年連続金賞。一度はギターをやめ大学へ進学するも、音楽への熱が再燃。現在はギターによる演奏活動と、教室でのレッスンをおこなっている。",
    instagram: "https://www.instagram.com/m.cig.mci", youtube: "", tiktok: "", x: "" },
  {
    id: "hiramatsu", name: "平松 恵", roman: "Megumi Hiramatsu", role: "", part: "バス",
    photo: "img/member2.jpg", photoPos: "center 30%",
    career: [
      "第57回 全日本ギターコンクール 独奏部門 第1位",
      "第47回 全日本学生ギターフェスティバル 独奏部門 特別金賞",
      "Bグループ コンサートミストレス（2年間）"
    ],
    message: "", instagram: "https://www.instagram.com/megu.mi1128/", youtube: "", tiktok: "", x: "" },
  {
    id: "hikichi", name: "曵地 大輔", roman: "Daisuke Hikichi", role: "", part: "ギタロン",
    photo: "",
    career: [],
    message: "2024年度 国際新堀芸術学院を卒業。卒業後は新堀ギターアンサンブル、DANROK、ドリマーズに所属し、演奏活動にあたっている。",
    instagram: "https://www.instagram.com/02daiii", youtube: "", tiktok: "", x: "" }
];
