import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Clock3,
  Gauge,
  GitBranch,
  LockKeyhole,
  Menu,
  MessageCircle,
  MoveRight,
  PlugZap,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const WHATSAPP_LINK = 'https://wa.me/5511977937213?text=Quero%20implementar%20o%20Antiban';

const navItems = [
  { label: 'O risco', href: '#risco' },
  { label: 'Como funciona', href: '#processo' },
  { label: 'Dúvidas', href: '#duvidas' },
];

const riskItems = [
  'Receber leads',
  'Fazer atendimento',
  'Recuperar clientes',
  'Fazer pós-venda',
  'Cobrar clientes',
  'Automatizar conversas',
  'Distribuir leads',
  'Manter o time operando',
];

const steps = [
  {
    number: '01',
    title: 'Verificação',
    description: 'Analisamos sua estrutura atual e identificamos os principais pontos de risco antes de mexer na operação.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'Implementação',
    description: 'Configuramos sua operação utilizando a API oficial do WhatsApp, sem atalhos e sem soluções não oficiais.',
    icon: PlugZap,
  },
  {
    number: '03',
    title: 'Estruturação',
    description: 'Deixamos o canal preparado para atendimento, automações e integrações que acompanham o ritmo do negócio.',
    icon: GitBranch,
  },
  {
    number: '04',
    title: 'Operação',
    description: 'Você deixa de depender de improvisos para manter seu canal comercial funcionando todos os dias.',
    icon: Gauge,
  },
];

const faqs = [
  {
    question: 'O que é a API oficial do WhatsApp?',
    answer: 'É a infraestrutura autorizada pela Meta para empresas operarem o WhatsApp com mais controle, estabilidade e capacidade de integração. Ela é diferente de ferramentas que simulam o WhatsApp Web.',
  },
  {
    question: 'Vou precisar trocar meu número?',
    answer: 'Na maioria dos casos, não. Primeiro entendemos como seu número está configurado e definimos a rota mais segura para a implementação. O diagnóstico acontece antes de qualquer mudança.',
  },
  {
    question: 'Quanto tempo leva a implementação?',
    answer: 'A implementação é feita em até 48 horas, desde que os acessos e informações necessários estejam disponíveis. Você acompanha cada etapa com clareza.',
  },
  {
    question: 'O Antiban é uma ferramenta de atendimento?',
    answer: 'Não. O Antiban é a implementação da infraestrutura oficial. Nós colocamos sua operação no caminho certo para depois usar atendimento, automações e integrações com mais segurança.',
  },
  {
    question: 'O que acontece depois que eu falar com vocês?',
    answer: 'Conversamos sobre sua operação atual, avaliamos os riscos e explicamos os próximos passos. Sem formulário longo e sem promessa vaga: você sai sabendo o que precisa ser feito.',
  },
];

function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="nav-shell" data-testid="header-navigation">
        <a className="brand-lockup" href="#inicio" data-testid="link-brand-home" onClick={closeMenu}>
          <img src="/antiban-logo.png" alt="Antiban" data-testid="img-brand-logo" />
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              className="nav-link"
              href={item.href}
              key={item.href}
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" data-testid="link-nav-whatsapp">
            Falar com a Antiban <ArrowUpRight size={15} strokeWidth={2.5} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>
      {menuOpen && (
        <nav className="mobile-panel" aria-label="Navegação mobile" data-testid="menu-mobile-panel">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </a>
          ))}
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" onClick={closeMenu} data-testid="link-mobile-whatsapp">
            Falar com a Antiban <ArrowUpRight size={15} />
          </a>
        </nav>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="section-wrap hero-grid">
        <Reveal className="hero-copy">
          <h1 className="display hero-title" id="hero-title">
            Seu WhatsApp não pode ser o <span>ponto fraco</span> da sua empresa.
          </h1>
          <p className="hero-description">
            Seu número cai. Seu time para. Seus leads ficam sem resposta. O Antiban coloca sua operação na API oficial do WhatsApp em até 48 horas.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" data-testid="link-hero-whatsapp">
              Quero implementar o Antiban <ArrowRight size={17} />
            </a>
            <a className="button-ghost" href="#processo" data-testid="link-hero-process">
              Entender o processo <MoveRight size={17} />
            </a>
          </div>
          <div className="hero-note">
            <LockKeyhole size={14} />
            <span>Contrato claro. Referências reais. Operação oficial.</span>
          </div>
        </Reveal>

        <Reveal className="system-visual delay-2">
          <div className="orbit" />
          <div className="system-card alert">
            <div className="card-kicker"><span>Risco detectado</span><CircleAlert size={15} color="#ff8c71" /></div>
            <h3>Canal instável</h3>
            <div className="status-row" style={{ color: '#ff8c71' }}><span className="status-dot" /> atendimento interrompido</div>
          </div>
          <div className="system-card main">
            <div className="card-kicker"><span>Antiban / camada oficial</span><ShieldCheck size={15} color="#d9ff62" /></div>
            <h3>Operação protegida.</h3>
            <p>Um canal comercial pronto para atender, automatizar e crescer.</p>
            <div className="status-row"><span className="status-dot" /> API oficial conectada</div>
          </div>
          <div className="signal-line" />
          <div className="system-card support">
            <div className="card-kicker"><span>Tempo de implementação</span><Clock3 size={15} color="#d9ff62" /></div>
            <h3>Até 48h</h3>
            <p>Da verificação à operação organizada.</p>
          </div>
          <span className="signal-label">transição de infraestrutura</span>
        </Reveal>
      </div>
      <div className="section-wrap hero-foot">
        <span>ANTIBAN / 001 — WHATSAPP BUSINESS API</span>
        <span>São Paulo · Brasil</span>
      </div>
    </section>
  );
}

function CredibilitySection() {
  return (
    <section className="credibility-section" aria-labelledby="credibility-title">
      <div className="section-wrap">
        <Reveal className="credibility-card">
          <div className="credibility-copy">
            <div className="mono-label" style={{ color: 'hsl(var(--foreground))' }}>Confiança para operar</div>
            <h2 className="display" id="credibility-title">Uma implementação séria começa antes da tecnologia.</h2>
            <p>
              A Antiban formaliza cada projeto em contrato, apresenta referências e conduz a migração com acompanhamento direto — do primeiro diagnóstico à operação.
            </p>
            <div className="credibility-list">
              {['Contrato de implementação', 'Referências de projetos realizados', 'Meta Business Partner'].map((item, index) => (
                <div className="credibility-item" key={item} data-testid={`item-credibility-${index + 1}`}>
                  <CircleCheck size={17} strokeWidth={2.3} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="partner-badge">
            <img src="/meta-business-partner.png" alt="Meta Business Partner" data-testid="img-meta-business-partner" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RiskSection() {
  return (
    <>
      <section className="light-section" id="risco" aria-labelledby="risk-title">
        <div className="section-wrap risk-layout">
          <Reveal className="risk-aside">
            <span className="number">01</span>
            <p>O problema não é se o seu número vai cair. É quanto dinheiro você vai perder até ele voltar.</p>
          </Reveal>
          <Reveal className="section-heading delay-1">
            <div className="mono-label" style={{ color: '#ff765d' }}>O custo da instabilidade</div>
            <h2 className="display" id="risk-title">WhatsApp é canal de vendas. <em>Trate como infraestrutura.</em></h2>
            <p>Se sua empresa depende do WhatsApp para operar, cada queda vira uma interrupção comercial. E interrupção tem custo.</p>
            <div className="risk-list" aria-label="Operações que dependem do WhatsApp" data-testid="list-operational-risks">
              {riskItems.map((item, index) => (
                <div className="risk-item" key={item} data-testid={`item-risk-${index + 1}`}>
                  <CircleAlert size={17} strokeWidth={2.4} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <div className="marquee" aria-label="Mensagem da Antiban">
        <div className="marquee-line" data-testid="text-brand-marquee">
          <span>Não espere seu número cair</span><span>API oficial em até 48 horas</span><span>Seu canal merece estrutura</span>
          <span>Não espere seu número cair</span><span>API oficial em até 48 horas</span><span>Seu canal merece estrutura</span>
          <span>Não espere seu número cair</span><span>API oficial em até 48 horas</span><span>Seu canal merece estrutura</span>
        </div>
      </div>
    </>
  );
}

function ProcessSection() {
  return (
    <section className="dark-section" id="processo" aria-labelledby="process-title">
      <div className="section-wrap steps-layout">
        <Reveal className="steps-intro">
          <div className="mono-label">O método Antiban</div>
          <div className="section-heading">
            <h2 className="display" id="process-title">Quatro passos. <span style={{ color: 'hsl(var(--secondary))' }}>Zero improviso.</span></h2>
            <p>Você entra com um canal instável. Sai com a base oficial para operar atendimento e automações.</p>
          </div>
          <div className="stamp"><Sparkles size={14} /><br />protocolo<br />48h</div>
        </Reveal>
        <div className="steps-list">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} className={`step delay-${(index % 3) + 1}`} >
                <span className="step-index" data-testid={`text-step-number-${step.number}`}>{step.number}</span>
                <div>
                  <h3 data-testid={`heading-step-${step.number}`}>{step.title}</h3>
                  <p data-testid={`text-step-description-${step.number}`}>{step.description}</p>
                </div>
                <Icon className="step-icon" size={22} strokeWidth={1.5} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatementSection() {
  return (
    <section className="quote-section" aria-labelledby="statement-title">
      <div className="section-wrap">
        <div className="quote-kicker mono-label" style={{ color: 'rgba(21, 29, 58, 0.66)' }}>A mudança de perspectiva</div>
        <Reveal>
          <h2 className="quote-text" id="statement-title">
            Você não precisa de outro chip. <span>Precisa de uma estrutura profissional.</span>
          </h2>
          <p className="quote-caption">O Antiban é a implementação que coloca a sua operação no caminho oficial — com clareza técnica e sem interromper o que já funciona.</p>
        </Reveal>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="proof-section" aria-labelledby="proof-title">
      <div className="section-wrap proof-grid">
        <Reveal className="proof-panel">
          <div className="mono-label">O cálculo é simples</div>
          <h3 className="display">O custo de prevenir é pequeno perto do custo de parar.</h3>
          <div className="proof-stat"><span>48</span><small>horas</small></div>
        </Reveal>
        <Reveal className="proof-copy delay-1">
          <div className="mono-label" style={{ color: '#ff765d' }}>Decisão operacional</div>
          <h2 className="display" id="proof-title">“Mas meu WhatsApp já funciona.”</h2>
          <p>Ótimo. A pergunta é: por quanto tempo? Se amanhã seu número cair, quanto sua empresa perde? R$1.000, R$5.000, R$10.000? Talvez muito mais.</p>
          <div className="proof-points">
            {['Diagnóstico antes de qualquer mudança', 'Implementação com a API oficial', 'Base pronta para escalar atendimento'].map((point, index) => (
              <div className="proof-point" key={point} data-testid={`item-proof-${index + 1}`}>
                <CircleCheck size={17} strokeWidth={2.3} /><span>{point}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq-section" id="duvidas" aria-labelledby="faq-title">
      <div className="section-wrap faq-layout">
        <Reveal className="faq-intro">
          <div className="mono-label" style={{ color: '#ff765d' }}>Perguntas diretas</div>
          <h2 className="display" id="faq-title">O que você precisa saber.</h2>
          <p>Sem letra miúda. Se uma dúvida ficou de fora, fale com nosso time direto pelo WhatsApp.</p>
          <a className="button-ghost" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" style={{ borderColor: 'hsl(var(--foreground))', color: 'hsl(var(--foreground))', marginTop: '22px' }} data-testid="link-faq-whatsapp">
            Falar com um especialista <MessageCircle size={16} />
          </a>
        </Reveal>
        <Reveal className="faq-list delay-1">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="faq-item" key={faq.question} data-testid={`item-faq-${index + 1}`}>
                <button
                  className="faq-trigger"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index + 1}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  data-testid={`button-faq-${index + 1}`}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={20} />
                </button>
                {isOpen && <div className="faq-answer" id={`faq-answer-${index + 1}`} data-testid={`text-faq-answer-${index + 1}`}>{faq.answer}</div>}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta-section" aria-labelledby="cta-title">
      <div className="section-wrap">
        <Reveal className="cta-card">
          <div className="mono-label">Próximo passo / agora</div>
          <h2 className="display" id="cta-title">Não espere seu número cair para <span>resolver.</span></h2>
          <p>Em até 48 horas, sua empresa pode sair da dependência de soluções improvisadas e começar a operar com uma infraestrutura oficial.</p>
          <a className="button-primary" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" data-testid="link-final-whatsapp">
            Quero implementar o Antiban <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="section-wrap footer-row">
        <div>
          <img className="footer-logo" src="/antiban-logo.png" alt="Antiban" data-testid="img-footer-logo" />
          <p>Seu WhatsApp é um canal de vendas. Trate ele como infraestrutura da sua empresa.</p>
        </div>
        <div className="footer-meta">
          <span data-testid="text-footer-location">Meta Business Partner / Brasil</span>
          <span data-testid="text-footer-time">Implementação em até 48h</span>
          <span data-testid="text-footer-cnpj">CNPJ 42.872.479/0001-04</span>
          <a href="#inicio" style={{ color: 'inherit', textDecoration: 'none' }} data-testid="link-footer-top">Voltar ao topo ↑</a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <CredibilitySection />
        <RiskSection />
        <ProcessSection />
        <StatementSection />
        <ProofSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;