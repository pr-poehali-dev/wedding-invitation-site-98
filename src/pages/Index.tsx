import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const COUPLE_IMAGE = "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0-9b0f-eddd700d6be1/files/086436ff-2b93-4b96-8348-438764198fcd.jpg";
const VENUE_IMAGE = "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0-9b0f-eddd700d6be1/files/ea4e93e0-1192-40cc-9834-368bf23000a7.jpg";
const DETAILS_IMAGE = "https://cdn.poehali.dev/projects/3f2f6e56-d3e2-49b0-9b0f-eddd700d6be1/files/c7041fc8-8894-4832-b9f8-960edf65f251.jpg";

const GALLERY_IMAGES = [
  COUPLE_IMAGE,
  VENUE_IMAGE,
  DETAILS_IMAGE,
  COUPLE_IMAGE,
  VENUE_IMAGE,
  DETAILS_IMAGE,
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
        <div className="font-montserrat uppercase tracking-[0.6em] text-2xl md:text-4xl text-wedding-dark mb-6">
          The Wedding Day
        </div>

        <div className="font-montserrat uppercase tracking-[0.5em] text-xs text-wedding-muted mb-10">
          Приглашаем вас на нашу свадьбу
        </div>

        <div className="font-pinyon text-8xl md:text-[10rem] text-wedding-dark leading-none mb-2">
          Ирина
        </div>

        <div className="font-pinyon text-5xl md:text-6xl text-wedding-accent mb-2">
          &amp;
        </div>

        <div className="font-pinyon text-8xl md:text-[10rem] text-wedding-dark leading-none mb-12">
          Андрей
        </div>

        <div className="w-px h-16 bg-wedding-line mx-auto mb-10" />

        <div className="font-cormorant text-2xl md:text-3xl text-wedding-dark/70 tracking-wider mb-2">
          20 · 06 · 2026 &nbsp;·&nbsp; 17:00
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={20} className="text-wedding-muted" />
      </div>

      <div className="absolute top-8 left-8 font-cormorant italic text-wedding-accent/40 text-6xl select-none">✦</div>
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
        <div className="font-cormorant italic text-wedding-dark text-xl">И &amp; А</div>

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

// ---- STORY ----
function Story() {
  const { ref, inView } = useInView();

  return (
    <Section id="story" className="bg-white">
      <div
        ref={ref}
        className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-16">
          <SectionLabel>Наша история</SectionLabel>
          <ScriptTitle>История любви</ScriptTitle>
          <Divider />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="border-l-2 border-wedding-accent pl-6">
              <div className="font-montserrat text-xs uppercase tracking-[0.2em] text-wedding-accent mb-2">2019</div>
              <div className="font-cormorant text-2xl text-wedding-dark mb-2">Первая встреча</div>
              <p className="font-montserrat text-sm text-wedding-muted leading-relaxed">
                Мы встретились совершенно случайно на одном из городских мероприятий. Один взгляд — и мир стал другим.
              </p>
            </div>

            <div className="border-l-2 border-wedding-line pl-6">
              <div className="font-montserrat text-xs uppercase tracking-[0.2em] text-wedding-muted mb-2">2021</div>
              <div className="font-cormorant text-2xl text-wedding-dark mb-2">Первое путешествие</div>
              <p className="font-montserrat text-sm text-wedding-muted leading-relaxed">
                Вместе мы открывали новые места, узнавали друг друга и понимали — это навсегда.
              </p>
            </div>

            <div className="border-l-2 border-wedding-accent pl-6">
              <div className="font-montserrat text-xs uppercase tracking-[0.2em] text-wedding-accent mb-2">2024</div>
              <div className="font-cormorant text-2xl text-wedding-dark mb-2">Помолвка</div>
              <p className="font-montserrat text-sm text-wedding-muted leading-relaxed">
                Под звёздным небом прозвучал главный вопрос. Ответ был — да.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border border-wedding-line" />
            <img
              src={COUPLE_IMAGE}
              alt="Пара"
              className="relative w-full aspect-[3/4] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-wedding-cream flex items-center justify-center">
              <span className="font-cormorant italic text-wedding-accent text-4xl">♡</span>
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
          <SectionLabel>Фотогалерея</SectionLabel>
          <ScriptTitle>Наши моменты</ScriptTitle>
          <Divider />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden cursor-pointer group ${i === 0 ? "row-span-2" : ""}`}
              onClick={() => setSelected(src)}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img
                src={src}
                alt=""
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i === 0 ? "h-full min-h-[300px]" : "h-48 md:h-56"
                }`}
              />
            </div>
          ))}
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
      <Story />
      <Gallery />
      <DateSection />
      <Location />
      <Contacts />
      <Footer />
    </div>
  );
}