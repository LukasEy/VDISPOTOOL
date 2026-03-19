function SectionLabel({ children }) {
  return (
    <p className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-[#1a5c5a] mb-3">
      {children}
    </p>
  );
}

function H2({ children }) {
  return (
    <h2 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
      {children}
    </h2>
  );
}

function H3({ children }) {
  return (
    <h3 className="text-base font-bold text-[#1a5c5a] mb-2">
      {children}
    </h3>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-1.5 mb-6">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-gray-700 text-sm leading-relaxed">
          <span className="text-[#1a5c5a] shrink-0 mt-0.5">▸</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PhaseBlock({ phase, title, items }) {
  return (
    <div className="border-l-4 border-[#1a5c5a] pl-4 mb-6">
      <p className="text-xs font-bold tracking-widest uppercase text-[#1a5c5a] mb-0.5">{phase}</p>
      <p className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>{title}</p>
      <BulletList items={items} />
    </div>
  );
}

export default function PolicyDocument() {
  return (
    <div className="space-y-6">

      {/* ── MERKBLATT ── */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="bg-[#1a5c5a] px-8 py-6">
          <SectionLabel>Merkblatt</SectionLabel>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Filmstandort Schleswig-Holstein –<br className="hidden sm:block" /> Was jetzt getan werden muss
          </h1>
        </div>

        <div className="p-8 space-y-6">
          {/* The 3-box situation brief */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Die Lage', color: 'bg-stone-50', text: 'Einzigartige Drehorte, gewachsenes Festivalnetzwerk, starker Partner MOIN. Trotzdem verlässt der Filmnachwuchs das Land, externe Produktionen kommen selten, Fördergeld fließt nach Hamburg.' },
              { label: 'Das Problem', color: 'bg-amber-50 border-amber-200', text: 'Kaum Produktionsfirmen in SH, kein Set-Service, keine Gründungsförderung für Filmunternehmen – und niemand, der das koordiniert.' },
              { label: 'Was auf dem Spiel steht', color: 'bg-red-50 border-red-200', text: 'Ohne Handlung: Nachwuchs wandert ab, Fördergelder fließen nach Hamburg, Produktionen drehen anderswo. Mit Handlung entsteht ein regionaler Wirtschaftskreislauf.' },
            ].map(({ label, color, text }) => (
              <div key={label} className={`${color} border border-stone-200 rounded-lg p-4`}>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* 6 steps table */}
          <div>
            <H2>6 sofort umsetzbare Schritte / Was die Politik tun muss</H2>
            <div className="overflow-x-auto rounded-lg border border-stone-200">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-[#1a5c5a] text-white">
                    <th className="px-5 py-3 font-semibold font-sans w-1/2">6 Schritte</th>
                    <th className="px-5 py-3 font-semibold font-sans w-1/2">Was die Politik tun muss</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="align-top">
                    <td className="px-5 py-4 text-gray-700 space-y-2 border-r border-stone-200">
                      {[
                        ['①', 'Filmkultur SH e.V. institutionell fördern', 'Mind. 1 hauptamtl. Stelle, 100.000–150.000 EUR/Jahr'],
                        ['②', 'Filmproduktionsfirmen in SH fördern', 'Gründungsförderung (WTSH/MOIN): Zuschuss bis 30.000 EUR + Beratung'],
                        ['③', 'Produktionsservice SH ermöglichen', 'Anschubfinanzierung für lokalen Set-Service'],
                        ['④', 'Politisches Mandat erteilen', 'Kabinettsbeschluss: Film & Medien in Kulturstrategie UND Wirtschaftsstrategie SH'],
                        ['⑤', 'NDR-Rundfunkrat aktivieren', 'SH-Auftragsquote beim NDR einfordern'],
                        ['⑥', '1. Filmgipfel SH einberufen', 'Alle Akteure an einen Tisch'],
                      ].map(([num, title, desc]) => (
                        <div key={num} className="flex gap-2">
                          <span className="text-[#1a5c5a] font-bold shrink-0">{num}</span>
                          <span><strong>{title}</strong> – {desc}</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-5 py-4 text-gray-700 space-y-3">
                      {[
                        ['Kulturministerium', 'Filmkultur SH e.V. als Dachverband institutionell anerkennen · Filmstandort in Kulturstrategie verankern · Festivals dauerhaft absichern · Filmresidenz fördern'],
                        ['Wirtschaftsministerium', 'Gründungsförderung für Filmproduktionsfirmen und Produktionsservice SH · Prüfauftrag Tax-Incentive-Modell'],
                        ['Staatskanzlei / Kabinett', 'Beschluss Film und Medien als Ziel in Kulturstrategie UND Wirtschaftsstrategie · 1. Filmgipfel SH einberufen (Herbst 2026)'],
                      ].map(([actor, text]) => (
                        <div key={actor}>
                          <p className="font-bold">{actor}:</p>
                          <p>{text}</p>
                        </div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3 phases summary */}
          <div className="bg-[#f0f9f9] border border-[#1a5c5a]/20 rounded-lg p-5">
            <H2>Der Weg: 3 Phasen bis 2032</H2>
            <div className="space-y-2 text-sm text-gray-700">
              {[
                ['2026–2027', 'Fundament legen', 'Geschäftsstelle · Gründungsförderung · Produktionsservice · Politisches Mandat · Filmgipfel'],
                ['2027–2029', 'Skalieren', 'Filmfonds · Studio-Hub · DK-Partnerschaft · Stipendien · Experimentalfilm-Förderlinie'],
                ['2029–2032', 'Ausstrahlen', 'SH-Förderkomponente bei MOIN · Internationalisierung · Fachkräftekampagne · Strategiereview'],
              ].map(([years, title, detail]) => (
                <div key={years} className="flex gap-3">
                  <span className="shrink-0 text-[#1a5c5a] font-bold w-24">{years}</span>
                  <span><strong>{title}:</strong> {detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STRATEGIEPAPIER ── */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="bg-stone-800 px-8 py-6">
          <SectionLabel>Strategiepapier</SectionLabel>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-1" style={{ fontFamily: 'Georgia, serif' }}>
            Filmstandort Schleswig-Holstein
          </h1>
          <p className="text-stone-300 text-base">Zukunftsfähig. Vernetzt. Unverwechselbar. 2026–2032</p>
          <p className="text-stone-400 text-xs mt-1 font-sans">
            Filmkultur Schleswig-Holstein e.V. · Stand: März 2026 · Entwurf zur Abstimmung
          </p>
        </div>

        <div className="p-8 space-y-10" style={{ fontFamily: 'Georgia, serif' }}>
          {/* 3 pillars */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { num: '01', title: 'Strukturen aufbauen', desc: 'Verbindliche Institutionen, Infrastruktur und Rechtsrahmen schaffen' },
              { num: '02', title: 'Talente halten', desc: 'SH als attraktiven Lebens- und Arbeitsort für Filmschaffende entwickeln' },
              { num: '03', title: 'Marke etablieren', desc: 'Die Identität des Nordens als Alleinstellungsmerkmal national und international kommunizieren' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-[#f0f9f9] border border-[#1a5c5a]/20 rounded-lg p-4">
                <p className="text-2xl font-bold text-[#1a5c5a]/30 mb-1 font-sans">{num}</p>
                <p className="font-bold text-gray-900 mb-1">{title}</p>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* 1. Zusammenfassung */}
          <section>
            <H2>1. Zusammenfassung</H2>
            <div className="space-y-3 text-gray-700 leading-relaxed text-[15px]">
              <p>
                Schleswig-Holstein hat einmalige Voraussetzungen für einen professionellen Filmstandort.
                Was fehlt sind Strukturen und ein klares politisches Mandat: ein Beschluss der Landesregierung,
                dass SH Filmstandort werden will. Die öffentliche Initialinvestition ist gering im Verhältnis
                zu dem, was sie ermöglicht.
              </p>
              <p>
                Dieses Strategiepapier formuliert eine gemeinsame Vision für die Jahre 2026–2032. Es richtet
                sich an Vertreter:innen der Kultur- und Wirtschaftspolitik, an Filmschaffende, Produktionsfirmen,
                Förderinstitutionen und zivilgesellschaftliche Akteure.
              </p>
              <p>
                Film ist dabei mehr als Wirtschaftsförderung. Er stärkt ländliche Räume als Lebens- und
                Arbeitsorte, macht regionales kulturelles Erbe sichtbar und schafft Identität – für die
                Menschen, die hier leben, und für die, die SH noch nicht kennen.
              </p>
            </div>
          </section>

          {/* 2. Ausgangslage */}
          <section>
            <H2>2. Ausgangslage – Was haben wir?</H2>

            <H3>2.1 Stärken des Standorts</H3>
            <BulletList items={[
              'Einzigartige Naturräume und Motive – Küste, Förden, Heide, Grenzlandschaft',
              'Gewachsenes Festivalnetzwerk – Flensburger Kurzfilmtage, Green Screen Eckernförde, Cinemare Kiel, Nordische Filmtage Lübeck, Filmfest SH, Husumer Filmtage',
              'MOIN Filmförderung Hamburg/Schleswig-Holstein – Leistungsstarker Partner mit Büros in Hamburg und Kiel',
              'Film Commission SH (bei MOIN) – Aktive Anlaufstelle für Drehgenehmigungen und Location-Scouting',
              'Baltic Motion – Berlinale-Empfang – Jährlicher SH-Empfang mit 600+ Gästen',
              'Starke Wertschöpfungseffekte – 2024: Aus 9,7 Mio. Euro MOIN-Fördermitteln entstanden 30,6 Mio. Euro regionaler Umsatz (Multiplikator 3,15)',
              'Filmkultur SH e.V. – Demokratisch neu konstituierter Dachverband',
              'Hochschullandschaft – Hochschule Flensburg (B.A. Film & Media Arts), Muthesius Kunsthochschule Kiel',
              'Deutsch-dänische Grenzregion – Einmalige kulturelle Brückenfunktion',
            ]} />

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
              <p className="text-xs font-sans font-bold uppercase tracking-wider text-amber-700 mb-2">Wertschöpfung 2024</p>
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-2xl font-bold text-gray-900">9,7 Mio. €</p>
                  <p className="text-sm text-gray-500">MOIN-Fördermittel</p>
                </div>
                <div className="flex items-center text-amber-500 text-2xl">→</div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">30,6 Mio. €</p>
                  <p className="text-sm text-gray-500">Regionaler Umsatz</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1a5c5a]">×3,15</p>
                  <p className="text-sm text-gray-500">Multiplikator</p>
                </div>
              </div>
            </div>

            <H3>2.2 Schwächen und strukturelle Lücken</H3>
            <BulletList items={[
              'Fehlende fahrzeuggebundene Produktionsinfrastruktur – Kein Produktionsservice in SH',
              'Das Regionaleffekt-Paradox – MOIN-geförderte Produktionen müssen 150% ihrer Fördersumme in HH/SH ausgeben, aber mangels lokaler Strukturen profitiert Hamburg überproportional',
              'Nachwuchsschwund – Ausgebildete Filmschaffende verlassen SH',
              'Zersplitterte Akteure – Kaum koordinierter Austausch',
              'Kaum eigenständige Produktionsfirmen in SH',
              'Fehlende Gründungsinfrastruktur für Filmunternehmen',
              'Unterfinanzierung künstlerischer Filmformen',
            ]} />
          </section>

          {/* 3. Vision */}
          <section>
            <H2>3. Vision und Ziele</H2>
            <div className="bg-[#1a5c5a] text-white rounded-lg p-5 mb-5">
              <p className="text-xs font-sans font-bold tracking-widest uppercase text-[#a3d9d7] mb-2">Vision 2032</p>
              <p className="text-base leading-relaxed">
                Schleswig-Holstein ist ein anerkannter, professionell aufgestellter Filmstandort in Nordeuropa –
                mit unverwechselbarer regionaler Identität, funktionierender Infrastruktur und einem lebendigen
                Nachwuchsökosystem.
              </p>
            </div>
            <BulletList items={[
              'Ziel 1: Wirtschaftliche Stärke aufbauen – Mindestens Verdoppelung des SH-Anteils an MOIN-Regionaleffekten bis 2030',
              'Ziel 2: Infrastruktur schaffen – Produktionsservice SH, Location-Datenbank, Studio-Hub',
              'Ziel 3: Talente halten und gewinnen – SH-Stipendienprogramm, Filmresidenz',
              'Ziel 4: Identität und Marke stärken – Standortmarke Film:Nord',
              'Ziel 5: Ländliche Räume stärken und Nachhaltigkeit verankern',
              'Ziel 6: Experimentalfilm, Independent und künstlerische Nischen fördern',
            ]} />
          </section>

          {/* 4. Maßnahmen */}
          <section>
            <H2>4. Der Weg dahin – Maßnahmen und Phasenplan</H2>
            <PhaseBlock
              phase="Phase 1 · 2026–2027"
              title="Fundament legen"
              items={[
                'Gründungsförderung für Filmproduktionsfirmen in SH (bis 30.000 EUR Zuschuss + Beratung)',
                'Gründung eines Produktionsservice SH (fahrzeuggebundene Infrastruktur)',
                'Stärkung der Geschäftsstelle Filmkultur SH (mind. 1,5 hauptamtliche Stellen)',
                'Politisches Mandat: Filmstandort als Ziel verankern',
                'Erstes SH-Filmgipfeltreffen',
              ]}
            />
            <PhaseBlock
              phase="Phase 2 · 2027–2029"
              title="Skalieren und verbinden"
              items={[
                'Prüfauftrag SH-Filmfonds (PPP-Modell)',
                'Partnerschaftsvertrag mit Region Syddanmark',
                'Filmnachwuchs-Stipendium SH (10 Stipendien p.a.)',
                'Erste Förderlinie für künstlerischen Kurzfilm/Experimentalfilm',
              ]}
            />
            <PhaseBlock
              phase="Phase 3 · 2029–2032"
              title="Konsolidieren und ausstrahlen"
              items={[
                'Eigenständige SH-Förderkomponente bei MOIN',
                'Internationale Koproduktionsachse Nord-Europa',
                'Fachkräftekampagne "Dreh dein Leben im Norden"',
                'Filmbildung in Schulen verankern',
              ]}
            />
          </section>

          {/* 5. Forderungen */}
          <section>
            <H2>5. Konkrete Forderungen an die Politik</H2>
            <div className="space-y-6">
              {[
                {
                  actor: 'Kulturministerium',
                  items: [
                    'Filmkultur SH e.V. institutionell fördern (mind. 150.000 EUR p.a.)',
                    'Filmstandort SH in die Kulturstrategie aufnehmen',
                    'Festivals dauerhaft absichern (Flensburger Kurzfilmtage, Green Screen, Cinemare, Nordische Filmtage)',
                    'Pilotprojekt Filmresidenz fördern',
                    'NDR-Rundfunkrat aktiv für SH-Auftragsquote nutzen',
                    'Förderlinie für künstlerischen Kurzfilm und Experimentalfilm einrichten',
                  ],
                },
                {
                  actor: 'Wirtschaftsministerium',
                  items: [
                    'Film und Medien als Wachstumsbranche in der Wirtschaftsstrategie verankern',
                    'Gründungsprogramm Filmproduktion SH einrichten',
                    'Gründungsförderung Produktionsservice SH',
                    'Prüfauftrag: Tax-Incentive-Modell für SH',
                  ],
                },
                {
                  actor: 'MOIN Filmförderung',
                  items: [
                    'SH-spezifische Wertschöpfung im Jahresbericht stärker ausweisen',
                    'Produktionsservice SH aktiv bewerben',
                    'Baltic Motion weiterentwickeln',
                  ],
                },
              ].map(({ actor, items }) => (
                <div key={actor}>
                  <H3>An das {actor}:</H3>
                  <BulletList items={items} />
                </div>
              ))}
            </div>
          </section>

          {/* 6. Fazit */}
          <section>
            <H2>6. Fazit und Aufruf</H2>
            <p className="text-gray-700 leading-relaxed mb-5 text-[15px]">
              Jetzt ist der richtige Moment. Es gibt erstmals mit Filmkultur SH e.V. eine handlungsfähige,
              demokratisch legitimierte Interessenvertretung. Was fehlt, ist der politische Wille, diesen Moment zu nutzen.
            </p>
            <div className="bg-[#f0f9f9] border border-[#1a5c5a]/20 rounded-lg p-5 mb-4">
              <p className="font-sans font-bold text-[#1a5c5a] mb-3">Wir laden ein zu:</p>
              <BulletList items={[
                'Verbindlichen Gesprächen zwischen Filmkultur SH, Kultur- und Wirtschaftsministerium',
                'Einem 1. Filmgipfel Schleswig-Holstein im Herbst 2026',
                'Einer öffentlichen Erklärung des Landes SH zum Filmstandort als strategischem Ziel',
              ]} />
            </div>
            <p className="text-sm font-sans text-gray-500">
              Kontakt: Filmkultur Schleswig-Holstein e.V. · Lukas Eylandt · Vorstand · le@filmkultur.sh · www.filmkultur.sh
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
