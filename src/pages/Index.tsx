import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const COUPLE_IMAGE = "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0-9b0f-eddd700d6be1/bucket/7ed42c51-3654-469c-8b89-7323f20a814a.jpg";
const FAMILY_IMAGE = "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0-9b0f-eddd700d6be1/bucket/11939517-ef86-481e-9ec0-e285b1f46b0f.JPG";
const VENUE_IMAGE = "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0-9b0f-eddd700d6be1/bucket/3becfec5-6ca5-4733-ba45-10182078f435.JPG";
const DETAILS_IMAGE = "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0f-eddd700d6be1/bucket/2da8db0f-3794-41b4-8d71-398c500a4b63.jpg";

const GALLERY_IMAGES = [
  "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0-9b0f-eddd700d6be1/bucket/32b8f47a-6623-4794-8e55-e4a7a343f236.JPG",
  "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0-9b0f-eddd700d6be1/bucket/1be26469-6168-408b-97e3-996d4aa37c8f.JPG",
  "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0-9b0f-eddd700d6be1/bucket/2c03f796-7369-4dc4-b8f8-85c6e1884ca2.JPG",
  "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0-9b0f-eddd700d6be1/bucket/3becfec5-6ca5-4733-ba45-10182078f435.JPG",
  "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0-9b0f-eddd700d6be1/bucket/2da8db0f-3794-41b4-8d71-398c500a4b63.jpg",
];

const TIMELINE = [
  { time: "17:00", label: "We Meet", desc: "Сбор гостей" },
  { time: "17:30", label: "We Do", desc: "Церемония регистрации" },
  { time: "18:30", label: "We Party", desc: "Начало банкета" },
  { time: "00:00", label: "The End", desc: "Завершение вечера" },
];

const WEDDING_DATE = new Date(2026, 5, 20); // June 20, 2026

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-24 px-6 ${className}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );
}

function ScriptTitle({ children }: { children: string }) {
  return (
    <div className="font-cormorant italic text-5xl md:text-6xl text-wedding-dark/80 mb-2 leading-none">
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="font-montserrat uppercase tracking-[0.3em] text-xs text-wedding-muted mb-6">
      {children}
    </div>
  );
}

function Divider() {
  return <div className="w-16 h-px bg-wedding-accent mx-auto my-8" />;
}

// ---- HERO ----
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-wedding-cream overflow-hidden"
      style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23c9a96e\" fill-opacity=\"0.04\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}
    >
      <div className="text-center animate-fade-in opacity-0">
        <div className="font-montserrat uppercase tracking-[0.6em] text-3xl md:text-5xl text-wedding-dark mb-8">
          The Wedding Day
        </div>

        <div className="w-48 h-px bg-wedding-dark/30 mx-auto mb-8" />

        <div className="font-corinthia text-[7rem] md:text-[11rem] text-wedding-dark leading-none mb-14">
          Andrew <span className="font-montserrat not-italic text-[3rem] md:text-[5rem] align-middle">&amp;</span> Irina
        </div>

        <div className="font-montserrat uppercase tracking-[0.5em] text-lg md:text-2xl text-wedding-dark/70 mb-2">
          20 · 06 · 2026 &nbsp;·&nbsp; 17:00
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={20} className="text-wedding-muted" />
      </div>

      <div className="absolute bottom-20 right-8 font-cormorant italic text-wedding-accent/30 text-4xl select-none">✦</div>
    </section>
  );
}

// ---- NAV ----
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: "Главная" },
    { href: "#story", label: "История" },
    { href: "#gallery", label: "Моменты" },
    { href: "#date", label: "Дата" },
    { href: "#location", label: "Локация" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div />

        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-montserrat text-[11px] uppercase tracking-[0.2em] text-wedding-muted hover:text-wedding-dark transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Icon name={open ? "X" : "Menu"} size={20} className="text-wedding-dark" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-wedding-line py-4 px-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-montserrat text-[11px] uppercase tracking-[0.2em] text-wedding-muted hover:text-wedding-dark transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---- FAMILY SECTION ----
function FamilySection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="family"
      className={`relative min-h-[80vh] flex items-stretch overflow-hidden transition-all duration-1000 ${inView ? "opacity-100" : "opacity-0"}`}
      ref={ref}
    >
      {/* Left: photo */}
      <div className="w-1/2 md:w-[45%] flex-shrink-0 relative">
        <img
          src={FAMILY_IMAGE}
          alt="Андрей и Ирина"
          className="w-full h-full object-cover object-top"
          style={{ minHeight: "80vh" }}
        />
      </div>

      {/* Center: vertical script text */}
      <div className="absolute left-[45%] top-0 bottom-0 flex items-center justify-center z-10" style={{ transform: "translateX(-50%)" }}>
        <div
          className="font-corinthia text-5xl text-wedding-dark/60 leading-none select-none"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed", letterSpacing: "0.05em" }}
        >
          In the merry and back
        </div>
      </div>

      {/* Right: text content */}
      <div className="flex-1 bg-[#f0edea] flex items-center pl-16 pr-10 md:pr-16">
        <div className="max-w-sm">
          <div className="font-corinthia text-7xl md:text-8xl text-wedding-dark leading-none mb-2">Мы</div>
          <div className="font-montserrat uppercase tracking-[0.25em] text-2xl md:text-3xl text-wedding-dark font-light leading-tight mb-8">
            Официально<br />станем семьей
          </div>
          <p className="font-montserrat text-sm text-wedding-muted leading-relaxed">
            Если вы сейчас читаете этот текст, значит вы находитесь в числе приглашённых на нашу свадьбу, и совсем скоро мы увидимся на нашем торжестве!
          </p>
        </div>
      </div>
    </section>
  );
}

// ---- STORY ----
function Story() {
  const { ref, inView } = useInView();

  return (
    <Section id="story" className="bg-white">
      <div
        ref={ref}
        className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="mb-16">
          <div className="font-montserrat uppercase tracking-[0.25em] text-4xl md:text-5xl text-wedding-dark font-light leading-tight mb-1">
            Наша история
          </div>
          <div className="font-corinthia text-6xl md:text-7xl text-wedding-dark leading-none">
            любви
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 font-montserrat text-sm text-wedding-muted leading-relaxed">
            <p>
              <strong className="text-wedding-dark font-semibold">Свайп в судьбу</strong>
            </p>
            <p>
              17 ноября 2020 года я, устав от «странных» ровесников и загадочных мужчин постарше, открыла Badoo с мыслью: «Нужен кто-то помладше, просто поболтать». А он просто скучал и свайпал. Бум — мэтч! Чат закипел, как чайник на плите.
            </p>
            <p>
              <strong className="text-wedding-dark font-semibold">Первая встреча с фейерверком</strong>
            </p>
            <p>
              Он пришёл с огромным букетом моих любимых роз — не букет, а целый розарий в руках. Я смотрела и думала: «Военный, высокий, с цветами — мечта сбылась!»
            </p>
            <p>
              Но подвох подкрался незаметно: оказалось, с таким «трофеем» за границу теперь только с сестрой или подругами, потому что Андрей — как ценный груз, нельзя вывозить из страны 😄
            </p>
            <p>
              И вот мы здесь, спустя годы — с теми же розами в сердце, тысячами километров за спиной и планами на будущее, которые уже не помещаются в один чемодан. Приглашаем вас на нашу свадьбу, чтобы вместе посмеяться над тем, как один случайный свайп перевернул две жизни, выпить за настоящую любовь и танцевать под «Матадору» до утра.
            </p>
          </div>

          {/* Photo stack: two photos, second peeking behind */}
          <div className="relative flex justify-center">
            {/* Back photo — rotated, offset */}
            <div
              className="absolute w-[85%] aspect-[3/4] bg-wedding-line overflow-hidden"
              style={{ transform: "rotate(5deg) translate(24px, -16px)", zIndex: 0 }}
            >
              <img
                src={FAMILY_IMAGE}
                alt=""
                className="w-full h-full object-cover object-top grayscale"
              />
            </div>
            {/* Front photo */}
            <div className="relative w-[85%] aspect-[3/4] overflow-hidden" style={{ zIndex: 1 }}>
              <img
                src={COUPLE_IMAGE}
                alt="Андрей и Ирина"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ---- GALLERY ----
function Gallery() {
  const { ref, inView } = useInView();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Section id="gallery" className="bg-wedding-cream">
      <div
        ref={ref}
        className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-16">
          <ScriptTitle>Наши моменты</ScriptTitle>
          <Divider />
        </div>

        {/* Коллаж: большое фото слева + 2 справа сверху + 2 снизу на всю ширину */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {/* Большое — занимает 2 строки слева */}
          <div
            className="row-span-2 overflow-hidden cursor-pointer group"
            onClick={() => setSelected(GALLERY_IMAGES[0])}
          >
            <img
              src={GALLERY_IMAGES[0]}
              alt=""
              className="w-full h-full min-h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Правый верх */}
          <div
            className="overflow-hidden cursor-pointer group"
            onClick={() => setSelected(GALLERY_IMAGES[1])}
          >
            <img
              src={GALLERY_IMAGES[1]}
              alt=""
              className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Правый верх 2 — только на md+ */}
          <div
            className="hidden md:block overflow-hidden cursor-pointer group"
            onClick={() => setSelected(GALLERY_IMAGES[2])}
          >
            <img
              src={GALLERY_IMAGES[2]}
              alt=""
              className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Правый низ */}
          <div
            className="overflow-hidden cursor-pointer group"
            onClick={() => setSelected(GALLERY_IMAGES[3])}
          >
            <img
              src={GALLERY_IMAGES[3]}
              alt=""
              className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Правый низ 2 — только на md+ */}
          <div
            className="hidden md:block overflow-hidden cursor-pointer group"
            onClick={() => setSelected(GALLERY_IMAGES[4])}
          >
            <img
              src={GALLERY_IMAGES[4]}
              alt=""
              className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* На мобайле показываем 3 и 4 снизу */}
        <div className="grid grid-cols-2 gap-2 mt-2 md:hidden">
          <div
            className="overflow-hidden cursor-pointer group"
            onClick={() => setSelected(GALLERY_IMAGES[2])}
          >
            <img src={GALLERY_IMAGES[2]} alt="" className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div
            className="overflow-hidden cursor-pointer group"
            onClick={() => setSelected(GALLERY_IMAGES[4])}
          >
            <img src={GALLERY_IMAGES[4]} alt="" className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <img src={selected} alt="" className="max-w-full max-h-full object-contain" />
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setSelected(null)}
          >
            <Icon name="X" size={28} />
          </button>
        </div>
      )}
    </Section>
  );
}

// ---- DATE ----
function DateSection() {
  const { ref, inView } = useInView();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = WEDDING_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];

  return (
    <Section id="date" className="bg-white">
      <div
        ref={ref}
        className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-16">
          <SectionLabel>Дата и время</SectionLabel>
          <div className="font-cormorant font-light text-7xl md:text-8xl text-wedding-dark">
            06
          </div>
          <div className="font-montserrat uppercase tracking-[0.4em] text-lg text-wedding-muted my-2">
            {months[WEDDING_DATE.getMonth()]} {WEDDING_DATE.getFullYear()}
          </div>
          <Divider />
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 mb-20 max-w-2xl mx-auto">
          {[
            { val: timeLeft.days, label: "дней" },
            { val: timeLeft.hours, label: "часов" },
            { val: timeLeft.minutes, label: "минут" },
            { val: timeLeft.seconds, label: "секунд" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center border border-wedding-line py-6">
              <div className="font-cormorant text-5xl text-wedding-dark tabular-nums">
                {String(val).padStart(2, "0")}
              </div>
              <div className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-wedding-muted mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="font-montserrat uppercase tracking-[0.3em] text-xs text-wedding-muted mb-1">Тайминг</div>
            <div className="font-cormorant italic text-4xl text-wedding-dark">Дня</div>
          </div>

          <div className="relative">
            <div className="absolute left-24 top-0 bottom-0 w-px bg-wedding-line" />
            <div className="space-y-10">
              {TIMELINE.map(({ time, label, desc }) => (
                <div key={time} className="flex items-start gap-6">
                  <div className="w-20 text-right font-montserrat text-lg text-wedding-dark font-light shrink-0">
                    {time}
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full border-2 border-wedding-accent bg-white" />
                    <div className="font-cormorant italic text-2xl text-wedding-dark mb-1">{label}</div>
                    <div className="w-32 h-px bg-wedding-line mb-2" />
                    <div className="font-montserrat text-sm text-wedding-muted">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ---- LOCATION ----
function Location() {
  const { ref, inView } = useInView();

  return (
    <Section id="location" className="bg-wedding-cream">
      <div
        ref={ref}
        className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-16">
          <SectionLabel>Место проведения</SectionLabel>
          <ScriptTitle>Локация</ScriptTitle>
          <div className="font-montserrat uppercase tracking-[0.3em] text-sm text-wedding-dark mt-3">
            Наша свадьба пройдёт в
          </div>
          <Divider />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Side photos */}
          <div className="hidden md:block w-56 h-64 overflow-hidden">
            <img src={DETAILS_IMAGE} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          {/* Main card */}
          <div className="bg-white shadow-sm p-3 max-w-sm w-full">
            <img src={VENUE_IMAGE} alt="Банкетный зал Вместе" className="w-full aspect-[4/3] object-cover mb-6" />
            <div className="px-4 pb-4 text-center">
              <div className="font-cormorant text-3xl text-wedding-dark mb-2">«Вместе»</div>
              <div className="font-montserrat text-sm text-wedding-muted">
                Адрес: г. Курск, ул. Киевская 69
              </div>
            </div>
          </div>

          {/* Side photo 2 */}
          <div className="hidden md:block w-56 h-64 overflow-hidden">
            <img src={COUPLE_IMAGE} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://yandex.ru/maps/?text=Курск+ул+Киевская+69"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-wedding-dark text-white font-montserrat text-xs uppercase tracking-[0.3em] px-10 py-4 hover:bg-wedding-dark/80 transition-colors"
          >
            <Icon name="MapPin" size={14} />
            Как добраться
          </a>
        </div>

        {/* Hotel */}
        <div className="mt-16 border-t border-wedding-line pt-12 text-center">
          <div className="font-montserrat uppercase tracking-[0.3em] text-xs text-wedding-muted mb-6">
            Для гостей не из Курска
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto items-center">
            <img
              src="https://cdn.poehali.dev/files/a57d10b3-4b91-4ab2-9d17-2a3bd5d10777.png"
              alt="Diamond Hotel"
              className="w-full aspect-video object-cover"
            />
            <div className="text-left">
              <div className="font-cormorant text-3xl text-wedding-dark mb-3">Diamond Hotel</div>
              <div className="font-montserrat text-sm text-wedding-muted leading-relaxed">
                Рекомендуемый отель для гостей, приезжающих из других городов. Удобное расположение рядом с площадкой.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ---- CONTACTS ----
function Contacts() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <Section id="contacts" className="bg-white">
      <div
        ref={ref}
        className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-16">
          <SectionLabel>Будем рады вас видеть</SectionLabel>
          <ScriptTitle>Контакты</ScriptTitle>
          <Divider />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contacts info */}
          <div className="space-y-8">
            <div>
              <div className="font-montserrat uppercase tracking-[0.2em] text-xs text-wedding-muted mb-4">
                Связь с нами
              </div>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Алексей", value: "+7 (900) 000-00-00" },
                  { icon: "Phone", label: "Мария", value: "+7 (900) 000-00-01" },
                  { icon: "Mail", label: "Email", value: "wedding@example.com" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4 border-b border-wedding-line pb-4">
                    <Icon name={icon as "Phone"} size={16} className="text-wedding-accent shrink-0" />
                    <div>
                      <div className="font-montserrat text-xs text-wedding-muted">{label}</div>
                      <div className="font-cormorant text-xl text-wedding-dark">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="font-montserrat uppercase tracking-[0.2em] text-xs text-wedding-muted mb-4">
                Социальные сети
              </div>
              <div className="flex gap-4">
                {[
                  { icon: "Send", label: "Telegram" },
                  { icon: "Instagram", label: "Instagram" },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center gap-2 border border-wedding-line px-4 py-2 font-montserrat text-xs text-wedding-muted hover:border-wedding-accent hover:text-wedding-dark transition-colors"
                  >
                    <Icon name={icon as "Send"} size={14} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="font-montserrat uppercase tracking-[0.2em] text-xs text-wedding-muted mb-6">
              Написать нам
            </div>
            {sent ? (
              <div className="text-center py-12 border border-wedding-line">
                <div className="font-cormorant italic text-4xl text-wedding-accent mb-3">✓</div>
                <div className="font-cormorant text-2xl text-wedding-dark mb-2">Спасибо!</div>
                <div className="font-montserrat text-sm text-wedding-muted">Мы получили ваше сообщение</div>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-4"
              >
                <div>
                  <label className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-wedding-muted block mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full border border-wedding-line bg-transparent px-4 py-3 font-montserrat text-sm text-wedding-dark placeholder:text-wedding-line focus:outline-none focus:border-wedding-accent transition-colors"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-wedding-muted block mb-2">
                    Сообщение
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="w-full border border-wedding-line bg-transparent px-4 py-3 font-montserrat text-sm text-wedding-dark placeholder:text-wedding-line focus:outline-none focus:border-wedding-accent transition-colors resize-none"
                    placeholder="Ваше пожелание или вопрос..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-wedding-dark text-white font-montserrat text-xs uppercase tracking-[0.3em] py-4 hover:bg-wedding-dark/80 transition-colors"
                >
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ---- FOOTER ----
function Footer() {
  return (
    <footer className="bg-wedding-cream border-t border-wedding-line py-12 text-center">
      <div className="font-cormorant italic text-4xl text-wedding-dark mb-2">И &amp; А</div>
      <div className="font-montserrat text-[10px] uppercase tracking-[0.4em] text-wedding-muted mb-6">
        20 · 06 · 2026
      </div>
      <div className="font-cormorant italic text-wedding-muted text-lg">
        С любовью ждём вас
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="bg-white">
      <Nav />
      <Hero />
      <FamilySection />
      <Story />
      <Gallery />
      <DateSection />
      <Location />
      <Contacts />
      <Footer />
    </div>
  );
}