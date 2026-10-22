"""Revolutionary Russia, 1894–1924."""

TOPIC = {
    "id": "russia",
    "name": "Revolutionary Russia",
    "short": "Russia",
    "dates": "1894–1924",
    "blurb": "Nicholas II's accession to the death of Lenin: a failing autocracy, "
             "war, two revolutions and the Bolshevik state.",
    "aspects": [
        {"key": "autocracy", "name": "Nicholas II and the autocracy", "dates": "1894–1905",
         "summary": "A tsar committed to unlimited power rules a fast-changing empire, and opposition grows.",
         "questions": ["How far did Nicholas II continue the policies of Alexander III in the years 1894–1905?",
                       "To what extent was opposition to tsarism a serious threat before 1905?"]},
        {"key": "economy", "name": "The Russian economy", "dates": "1894–1914",
         "summary": "Witte's state-led industrialisation, then Stolypin's land reforms and the 1908–13 boom.",
         "questions": [
             "\"The Russian economy was transformed in the years 1894–1914.\" Assess the validity of this view.",
             "How far was state policy the main reason for Russian economic growth in the years 1894–1914?",
             "\"Russia's economic modernisation in the years 1894–1914 was fundamentally limited by the backwardness of agriculture.\" Assess the validity of this view."]},
        {"key": "y1905", "name": "1905 and the Dumas", "dates": "1904–1914",
         "summary": "Defeat by Japan sparks revolution; the Tsar concedes a parliament, then hollows it out.",
         "questions": ["To what extent did the October Manifesto change the way Russia was governed in the years 1905–1914?",
                       "How far was the Tsar's survival in 1905 due to the loyalty of the army?"]},
        {"key": "war", "name": "War and the February Revolution", "dates": "1914–1917",
         "summary": "Total war breaks the army, the economy and the dynasty's reputation.",
         "questions": ["How far was the First World War the main reason for the fall of the Tsar in February 1917?",
                       "\"The February Revolution was a spontaneous uprising.\" Assess the validity of this view."]},
        {"key": "y1917", "name": "The Provisional Government and October", "dates": "1917",
         "summary": "Eight months of Dual Power end with the Bolshevik seizure of power.",
         "questions": ["\"The Bolsheviks took power in October 1917 because of the weakness of the Provisional Government.\" Assess the validity of this view.",
                       "How important was Lenin to the Bolshevik seizure of power in October 1917?"]},
        {"key": "civilwar", "name": "Civil War and War Communism", "dates": "1918–1921",
         "summary": "The Bolsheviks fight for survival and build a one-party state by force.",
         "questions": ["How far was Trotsky's leadership the main reason for Bolshevik victory in the Civil War?",
                       "To what extent was War Communism a response to the needs of the Civil War?"]},
        {"key": "nep", "name": "NEP and Lenin's legacy", "dates": "1921–1924",
         "summary": "Economic retreat, political tightening, and the question of who succeeds Lenin.",
         "questions": ["To what extent had Lenin created a one-party dictatorship by 1924?",
                       "\"The New Economic Policy was a betrayal of Bolshevik principles.\" Assess the validity of this view."]},
    ],
    "essays": [
        {"id": "russia-economy", "aspect": "economy", "file": "russia/economy-1894-1914.md",
         "title": "The Russian Economy, 1894–1914",
         "summary": "Three full essay plans, a timeline, a statistics bank and historians."},
    ],
    "timeline_note": "Dates before February 1918 use the Julian (Old Style) calendar Russia used at the time, "
                     "13 days behind the Western calendar. That is why the October Revolution was on 7 November by Western dates.",
}

TIMELINE = [
    ("Oct 1894", "Nicholas II becomes Tsar on the death of Alexander III.", "nicholas-ii"),
    ("Jan 1895", "Nicholas dismisses hopes of reform as \"senseless dreams\"."),
    ("May 1896", "Khodynka Field: over 1,300 die in a crush during coronation celebrations."),
    ("1897", "Rouble put on the gold standard. First census: about 125 million people, about 80% of them peasants.", "witte"),
    ("1898", "Social Democratic Labour Party (SDs) founded."),
    ("1901", "Socialist Revolutionaries (SRs) founded."),
    ("1903", "SDs split into Bolsheviks and Mensheviks. Witte moved out of the Finance Ministry.", "lenin"),
    ("Feb 1904", "Japan attacks Port Arthur: the Russo-Japanese War begins.", "russo-japanese-war"),
    ("9 Jan 1905", "Bloody Sunday in St Petersburg.", "bloody-sunday"),
    ("May 1905", "Baltic Fleet destroyed at Tsushima.", "russo-japanese-war"),
    ("17 Oct 1905", "October Manifesto promises a Duma and civil rights.", "revolution-1905"),
    ("Dec 1905", "Moscow uprising crushed by the army.", "revolution-1905"),
    ("Apr 1906", "Fundamental Laws reassert the Tsar's \"supreme autocratic power\". First Duma meets.", "dumas"),
    ("Nov 1906", "Stolypin's land decree lets peasants leave the commune.", "stolypin"),
    ("Jun 1907", "Stolypin dissolves the Second Duma and rewrites the electoral law.", "dumas"),
    ("Sep 1911", "Stolypin assassinated in Kiev.", "stolypin"),
    ("Apr 1912", "Lena Goldfields massacre sets off a strike wave.", "lena-goldfields"),
    ("Jul 1914", "Russia enters the First World War.", "first-world-war"),
    ("Aug 1914", "Defeat at Tannenberg.", "first-world-war"),
    ("Sep 1915", "Nicholas takes personal command of the army.", "nicholas-ii"),
    ("Dec 1916", "Rasputin murdered.", "rasputin"),
    ("23 Feb 1917", "Women's Day protests in Petrograd start the February Revolution.", "february-revolution"),
    ("2 Mar 1917", "Nicholas abdicates. Provisional Government and Petrograd Soviet share power.", "february-revolution"),
    ("3 Apr 1917", "Lenin returns and issues the April Theses.", "lenin"),
    ("3–4 Jul 1917", "The July Days: failed rising in Petrograd; Lenin flees to Finland.", "dual-power"),
    ("Aug 1917", "The Kornilov Affair.", "kornilov"),
    ("25 Oct 1917", "Bolsheviks seize power; the Winter Palace falls overnight.", "october-revolution"),
    ("Dec 1917", "The Cheka is set up.", "red-terror"),
    ("Jan 1918", "The Constituent Assembly meets once and is shut down.", "constituent-assembly"),
    ("3 Mar 1918", "Treaty of Brest-Litovsk takes Russia out of the war.", "brest-litovsk"),
    ("May 1918", "Revolt of the Czech Legion; the Civil War spreads.", "civil-war"),
    ("Jun 1918", "War Communism: large-scale nationalisation of industry begins.", "war-communism"),
    ("Jul 1918", "The royal family is shot at Ekaterinburg.", "nicholas-ii"),
    ("Aug–Sep 1918", "Lenin shot; the Red Terror is declared.", "red-terror"),
    ("1919", "White offensives under Kolchak, Denikin and Yudenich all fail.", "civil-war"),
    ("Mar 1921", "Kronstadt rising crushed. NEP announced; factions banned.", "kronstadt"),
    ("1921–22", "Famine in the Volga region kills around 5 million.", "war-communism"),
    ("Apr 1922", "Stalin becomes General Secretary.", "stalin"),
    ("Dec 1922", "USSR formed. Lenin dictates his Testament.", "lenin"),
    ("21 Jan 1924", "Lenin dies.", "lenin"),
]

ENTRIES = [
    # ------------------------------------------------------------------ people
    {
        "id": "nicholas-ii", "kind": "person", "name": "Nicholas II",
        "dates": "1868–1918", "role": "Tsar of Russia, 1894–1917, and the last Romanov ruler.",
        "aspects": ["autocracy", "y1905", "war"],
        "summary": """Nicholas inherited the throne at 26 and a firm belief, drilled into him by his father and his tutor Pobedonostsev, that God had given him unlimited power to hold in trust for his heir. He was dutiful and devoted to his family, but indecisive, poorly informed about his own country, and suspicious of ministers who were cleverer than him.

He survived 1905 by making concessions he then clawed back. In 1915 he took personal command of the army, which tied him directly to every defeat and left the government in Petrograd to his wife. When the Petrograd garrison mutinied in February 1917, his generals told him to abdicate, and he did.""",
        "facts": [
            "Called the hopes of reformers \"senseless dreams\" in January 1895, months into his reign.",
            "His coronation celebrations in 1896 included the Khodynka Field crush, in which over 1,300 died. He attended a ball that evening.",
            "Granted the October Manifesto (1905) under pressure, then issued the Fundamental Laws (1906) restating his \"supreme autocratic power\".",
            "Dissolved the first two Dumas within months.",
            "Took command of the army at Mogilev in September 1915, 800 km from Petrograd.",
            "Abdicated for himself and his son on 2 March 1917. His brother Michael refused the throne the next day.",
            "Shot with his family by the Bolsheviks at Ekaterinburg in July 1918.",
        ],
        "timeline": [
            ("1894", "Succeeds Alexander III; marries Alexandra of Hesse."),
            ("1896", "Coronation; Khodynka Field disaster."),
            ("1904", "War with Japan. Son Alexei born with haemophilia."),
            ("1905", "Bloody Sunday; October Manifesto."),
            ("1906", "Fundamental Laws; dissolves the First Duma."),
            ("1913", "Romanov tercentenary celebrations."),
            ("1915", "Takes personal command of the army."),
            ("1917", "Abdicates on 2 March."),
            ("1918", "Executed at Ekaterinburg, 16–17 July."),
        ],
        "significance": [
            "**Personal failure vs structural weakness.** Using Nicholas lets you argue the regime fell because of a weak ruler. The counter is that any tsar would have struggled with war, a peasant land crisis and a growing working class. Good essays weigh both.",
            "**The \"little father\" myth.** Peasants and workers traditionally blamed bad officials, not the Tsar. Bloody Sunday and the war destroyed that belief, so Nicholas personally became the target.",
            "**Wasted chances.** 1905–06 and 1915 (the Progressive Bloc) were moments when sharing power with moderates might have saved the monarchy. He refused both times.",
            "**Commander-in-chief.** Shorthand for the turning point when military defeat became the Tsar's personal responsibility.",
        ],
        "links": ["alexandra", "rasputin", "bloody-sunday", "revolution-1905", "dumas", "february-revolution"],
        "questions": [
            ("How far was Nicholas II personally responsible for the fall of the Romanov dynasty?",
             "Central evidence. Set his choices (1905 backtracking, 1915 command, refusing the Progressive Bloc) against the war and long-term problems."),
            ("To what extent did the October Manifesto change the way Russia was governed in the years 1905–1914?",
             "Use the Fundamental Laws and his treatment of the Dumas to argue that he never accepted limits on his power."),
        ],
    },
    {
        "id": "alexandra", "kind": "person", "name": "Empress Alexandra",
        "dates": "1872–1918", "role": "Wife of Nicholas II; effectively ran domestic government in 1915–16.",
        "aspects": ["war"],
        "summary": """A German-born princess (Alix of Hesse) and a granddaughter of Queen Victoria, Alexandra was deeply religious and fiercely protective of autocracy. She urged Nicholas to be firmer and to \"be Peter the Great\".

Her son Alexei's haemophilia made her rely on Rasputin, who seemed able to ease his bleeding. When Nicholas left for the front in 1915, she took charge of domestic affairs and, guided by Rasputin, kept replacing ministers.""",
        "facts": [
            "German birth made her a target of rumours of treason once war with Germany began.",
            "Between September 1915 and February 1917 Russia had four prime ministers and six interior ministers: the \"ministerial leapfrog\".",
            "Her letters to Nicholas show her pushing him to dismiss ministers who criticised Rasputin.",
        ],
        "timeline": [
            ("1894", "Marries Nicholas."),
            ("1904", "Alexei born with haemophilia."),
            ("1905", "Rasputin introduced to the royal family."),
            ("1915", "Takes charge of domestic government."),
            ("1918", "Executed at Ekaterinburg."),
        ],
        "significance": [
            "**Discredited the dynasty from the inside.** Her influence, her German birth and her link with Rasputin made the monarchy look foreign and corrupt even to loyal nobles.",
            "**Wartime misgovernment.** \"Ministerial leapfrog\" is the go-to example of administrative chaos in 1915–16.",
        ],
        "links": ["nicholas-ii", "rasputin", "first-world-war"],
        "questions": [
            ("How far was the First World War the main reason for the fall of the Tsar in February 1917?",
             "Use her as a political factor that the war made worse: domestic government collapsing while the Tsar was at the front."),
        ],
    },
    {
        "id": "rasputin", "kind": "person", "name": "Grigori Rasputin",
        "dates": "1869–1916", "role": "Siberian holy man whose hold over the royal family scandalised Russia.",
        "aspects": ["war"],
        "summary": """A peasant mystic from Siberia, Rasputin gained the trust of Alexandra because he seemed to ease Alexei's haemophilia. His drinking and womanising were widely reported, and in wartime he was believed to be choosing ministers. In December 1916 a group of aristocrats led by Prince Felix Yusupov murdered him to save the monarchy's reputation. It came too late.""",
        "facts": [
            "Introduced to the royal family in 1905.",
            "Influenced appointments in 1915–16, for example the hapless Prime Minister Stürmer in 1916.",
            "Murdered on 16–17 December 1916 by Yusupov, Grand Duke Dmitri and the right-wing Duma member Purishkevich.",
        ],
        "timeline": [
            ("1905", "Meets Nicholas and Alexandra."),
            ("1915–16", "Influence peaks while Nicholas is at the front."),
            ("Dec 1916", "Murdered in Petrograd."),
        ],
        "significance": [
            "**Symbol rather than cause.** Historians mostly treat Rasputin as a symptom of the regime's isolation. He damaged its prestige more than he directed policy.",
            "**Elite alienation.** That nobles killed him shows even the Tsar's natural supporters had lost faith by late 1916.",
        ],
        "links": ["alexandra", "nicholas-ii"],
        "questions": [
            ("\"The tsarist regime collapsed because it had lost the support of the elites.\" Assess the validity of this view.",
             "His murder by aristocrats is strong evidence for elite alienation."),
        ],
    },
    {
        "id": "witte", "kind": "person", "name": "Sergei Witte",
        "dates": "1849–1915", "role": "Finance Minister 1892–1903; the architect of Russia's industrial boom.",
        "aspects": ["economy", "y1905"],
        "summary": """A former railway manager, Witte believed Russia must industrialise or become a \"colony\" of the West. As Finance Minister he used high tariffs, foreign loans, the gold standard and huge state railway projects to drive industry, paying for it with taxes on the peasantry.

Nicholas disliked him and moved him out in 1903. Recalled in 1905, he negotiated peace with Japan, drafted the October Manifesto and secured a large French loan before being dismissed again in 1906.""",
        "facts": [
            "Industrial growth averaged about 8% a year in the 1890s.",
            "Put the rouble on the gold standard in 1897 to attract foreign investment.",
            "Drove the Trans-Siberian Railway (begun 1891).",
            "Introduced the state vodka monopoly from 1894, a major source of revenue.",
            "Prime Minister October 1905 – April 1906.",
        ],
        "timeline": [
            ("1892", "Becomes Minister of Finance."),
            ("1897", "Gold standard."),
            ("1899", "Memorandum to Nicholas defending industrialisation."),
            ("1903", "Moved out of the Finance Ministry."),
            ("1905", "Treaty of Portsmouth; October Manifesto."),
            ("1906", "Dismissed as Prime Minister."),
        ],
        "significance": [
            "**State-led modernisation.** Witte is the case study for Gerschenkron's \"relative backwardness\" thesis.",
            "**Growth at the peasants' expense.** His system relied on grain exports and indirect taxes, which links economics to rural unrest in 1902–07.",
            "**The pragmatic servant of an autocrat who didn't trust him.** Useful for arguing that Nicholas wasted his ablest ministers.",
        ],
        "links": ["stolypin", "revolution-1905", "russo-japanese-war"],
        "questions": [
            ("How far was state policy the main reason for Russian economic growth in the years 1894–1914?",
             "The core of the \"state\" argument. See the full essay plans."),
            ("How far was the Tsar's survival in 1905 due to concessions rather than repression?",
             "His October Manifesto split the opposition: liberals accepted it, so the revolution lost its middle-class wing."),
        ],
    },
    {
        "id": "stolypin", "kind": "person", "name": "Pyotr Stolypin",
        "dates": "1862–1911", "role": "Prime Minister 1906–11: repression and land reform.",
        "aspects": ["y1905", "economy"],
        "summary": """A tough provincial governor, Stolypin became Interior Minister and then Prime Minister in 1906. His policy was \"pacification first, then reform\". Field courts-martial executed thousands of rebels; the noose became known as \"Stolypin's necktie\".

His land reforms let peasants leave the commune and consolidate their strips into private farms. He hoped to create a class of prosperous, loyal peasant farmers, a \"wager on the strong\". He said he needed twenty years of peace. He was shot in a Kiev theatre in September 1911.""",
        "facts": [
            "Field courts-martial (1906–07) executed over 1,000 people, with thousands more in later years.",
            "Decree of 9 November 1906 allowed peasants to leave the commune.",
            "By 1914 about 2–2.5 million households had applied to leave, but only around 10% of peasant households farmed fully consolidated holdings.",
            "About 3 million peasants resettled in Siberia between 1906 and 1914.",
            "Dissolved the Second Duma in June 1907 and changed the electoral law to favour landowners: the \"Stolypin coup\".",
            "Assassinated by Dmitri Bogrov, a revolutionary who was also a police informer.",
        ],
        "timeline": [
            ("1906", "Becomes Interior Minister, then Prime Minister. Land decree."),
            ("1907", "Dissolves Second Duma; new electoral law."),
            ("1910", "Land reform law confirmed by the Duma."),
            ("1911", "Assassinated in Kiev."),
        ],
        "significance": [
            "**Repression and reform together.** He shows the regime could still act decisively after 1905, which supports arguments that tsarism was recovering before 1914.",
            "**\"Twenty years of peace\".** The phrase lets you argue the war, not tsarism's flaws, cut reform short. The counter: progress was slow even before 1914.",
            "**Optimists vs pessimists.** Historians who think tsarism could have survived lean on Stolypin; pessimists like Figes say the reforms were too little, too late.",
        ],
        "links": ["witte", "dumas", "revolution-1905"],
        "questions": [
            ("\"Russia's economic modernisation in the years 1894–1914 was fundamentally limited by the backwardness of agriculture.\" Assess the validity of this view.",
             "His reforms are the test case for whether agriculture was changing."),
            ("To what extent had tsarism recovered from the 1905 revolution by 1914?",
             "Use him on both sides: order restored and reform begun, but the Duma gutted and the reforms unfinished."),
        ],
    },
    {
        "id": "gapon", "kind": "person", "name": "Father Georgi Gapon",
        "dates": "1870–1906", "role": "Priest and union organiser who led the Bloody Sunday march.",
        "aspects": ["y1905"],
        "summary": """An Orthodox priest who ran the Assembly of Russian Factory and Mill Workers, a union tolerated by the police on the model of Zubatov's \"police socialism\". In January 1905 he led a peaceful march to the Winter Palace to petition the Tsar for an eight-hour day, a minimum wage and an elected assembly. Troops opened fire. Gapon fled abroad, later returned, and was killed by SRs in 1906 who believed he was a police agent.""",
        "facts": [
            "The marchers carried icons and portraits of the Tsar.",
            "The petition asked for an eight-hour day, better wages, and a constituent assembly.",
            "Hanged by SRs in Finland in March 1906.",
        ],
        "timeline": [
            ("1904", "Founds the Assembly of Russian Factory and Mill Workers."),
            ("9 Jan 1905", "Leads the march on Bloody Sunday."),
            ("1906", "Killed by SRs."),
        ],
        "significance": [
            "**Loyal protest turned revolutionary.** The march was led by a priest and was loyal to the Tsar, which is why the shooting was so damaging.",
            "**Police socialism backfired.** Unions the state tolerated to steer workers away from revolution ended up organising them.",
        ],
        "links": ["bloody-sunday", "revolution-1905"],
        "questions": [
            ("How far was Bloody Sunday the main cause of the 1905 revolution?",
             "Explains why the march began loyal and why the shooting was a turning point."),
        ],
    },
    {
        "id": "milyukov", "kind": "person", "name": "Pavel Milyukov",
        "dates": "1859–1943", "role": "Leader of the liberal Kadets; Foreign Minister in 1917.",
        "aspects": ["y1905", "war", "y1917"],
        "summary": """A history professor and the leading figure of the Kadets (Constitutional Democrats), founded in 1905. He led the liberal opposition in the Dumas and the Progressive Bloc in 1915. His November 1916 Duma speech, listing government failures and asking after each one \"Is this stupidity or treason?\", was a sensation.

As Foreign Minister of the Provisional Government he promised the Allies that Russia would fight on. When the \"Milyukov note\" became public in April 1917, protests forced him out.""",
        "facts": [
            "Kadets were the largest party in the First Duma (1906).",
            "Led the Progressive Bloc (August 1915), which demanded a \"government of public confidence\". Nicholas refused.",
            "\"Stupidity or treason?\" speech: 1 November 1916.",
            "Resigned in May 1917 after the April Crisis.",
        ],
        "timeline": [
            ("1905", "Founds the Kadets."),
            ("1915", "Leads the Progressive Bloc."),
            ("Nov 1916", "\"Stupidity or treason?\" speech."),
            ("Mar–May 1917", "Foreign Minister."),
        ],
        "significance": [
            "**Liberal opposition.** He shows the educated middle class wanted a constitutional monarchy, not revolution, until the Tsar shut them out.",
            "**Continuing the war.** The Milyukov note is the first sign that the Provisional Government's commitment to the war would destroy it.",
        ],
        "links": ["dumas", "dual-power", "first-world-war"],
        "questions": [
            ("\"The Bolsheviks took power in October 1917 because of the weakness of the Provisional Government.\" Assess the validity of this view.",
             "The April Crisis shows the war policy weakening the government from its first weeks."),
        ],
    },
    {
        "id": "kerensky", "kind": "person", "name": "Alexander Kerensky",
        "dates": "1881–1970", "role": "Socialist lawyer; Prime Minister of the Provisional Government, July–October 1917.",
        "aspects": ["y1917"],
        "summary": """A brilliant speaker and the only socialist in the first Provisional Government, Kerensky was also a member of the Petrograd Soviet, a bridge between the two halves of Dual Power. As War Minister he launched the disastrous June Offensive. He became Prime Minister in July.

In the Kornilov Affair he turned to the Soviet and the Bolsheviks for help and armed the Red Guards. That saved him in August and doomed him in October. He fled Petrograd as the Bolsheviks took over and lived the rest of his life in exile.""",
        "facts": [
            "Minister of Justice (March), War Minister (May), Prime Minister (July 1917).",
            "The June Offensive collapsed, with heavy losses and mass desertion.",
            "Released Bolsheviks from prison and handed out rifles during the Kornilov Affair.",
            "Died in New York in 1970.",
        ],
        "timeline": [
            ("Mar 1917", "Minister of Justice."),
            ("Jun 1917", "Launches the June Offensive as War Minister."),
            ("Jul 1917", "Becomes Prime Minister after the July Days."),
            ("Aug 1917", "Kornilov Affair."),
            ("25 Oct 1917", "Flees Petrograd."),
        ],
        "significance": [
            "**The failure of moderate socialism.** He represents the hope of a democratic revolution, and its inability to end the war or give peasants land.",
            "**Kornilov as the turning point.** His decisions in August made the Bolsheviks look like the defenders of the revolution.",
        ],
        "links": ["kornilov", "dual-power", "october-revolution"],
        "questions": [
            ("\"The Bolsheviks took power in October 1917 because of the weakness of the Provisional Government.\" Assess the validity of this view.",
             "Key evidence for the \"weakness\" side: the June Offensive and the Kornilov Affair."),
        ],
    },
    {
        "id": "kornilov", "kind": "person", "name": "General Lavr Kornilov",
        "dates": "1870–1918", "role": "Army Commander-in-Chief whose move on Petrograd backfired.",
        "aspects": ["y1917", "civilwar"],
        "summary": """A Cossack general appointed Commander-in-Chief by Kerensky in July 1917 to restore army discipline. In late August he sent troops toward Petrograd, apparently believing he had Kerensky's approval to crush the Soviet. Kerensky branded it a coup and called on the Soviet for help. Railway workers stopped the trains and Bolshevik agitators persuaded the troops not to fight. Kornilov was arrested, escaped, and helped found the White Volunteer Army. He was killed in April 1918.""",
        "facts": [
            "Wanted the death penalty restored at the front and in the rear.",
            "Kornilov Affair: 27–30 August 1917.",
            "Bolshevik membership and support grew sharply afterwards. They won majorities in the Petrograd and Moscow Soviets in September.",
        ],
        "timeline": [
            ("Jul 1917", "Made Commander-in-Chief."),
            ("Aug 1917", "Kornilov Affair."),
            ("1918", "Leads the Volunteer Army; killed near Ekaterinodar."),
        ],
        "significance": [
            "**The Bolsheviks' great gift.** The affair armed the Red Guards and made the Bolsheviks look like the revolution's protectors.",
            "**The threat from the right.** It showed soldiers and workers that counter-revolution was real, which pushed them toward the Soviet.",
        ],
        "links": ["kerensky", "dual-power", "october-revolution", "trotsky"],
        "questions": [
            ("How far was the Kornilov Affair the turning point of 1917?",
             "Compare it with the July Days and Lenin's return."),
        ],
    },
    {
        "id": "lenin", "kind": "person", "name": "Vladimir Lenin",
        "dates": "1870–1924", "role": "Bolshevik leader; head of the Soviet government 1917–24.",
        "aspects": ["autocracy", "y1917", "civilwar", "nep"],
        "summary": """Born Vladimir Ulyanov, Lenin was radicalised after his elder brother was hanged in 1887 for plotting to kill Alexander III. He argued in *What Is To Be Done?* (1902) for a small party of professional revolutionaries, and this split the Social Democrats in 1903.

Abroad for most of 1905–17, he returned in April 1917 on a train arranged by the Germans and demanded no support for the Provisional Government. After the October seizure of power he took Russia out of the war, shut down the Constituent Assembly, fought the Civil War, and then retreated economically with NEP while tightening political control. Strokes from 1922 sidelined him, and he died in January 1924.""",
        "facts": [
            "Exiled to Siberia 1897–1900.",
            "April Theses (1917): \"Peace, Bread, Land\" and \"All power to the Soviets\".",
            "Hid in Finland after the July Days; pressed the Central Committee to vote for a rising on 10 October.",
            "Chairman of Sovnarkom (the Council of People's Commissars).",
            "Shot and wounded by Fanny Kaplan, August 1918.",
            "Introduced NEP and the ban on factions at the Tenth Party Congress, March 1921.",
            "His Testament (December 1922 – January 1923) warned against Stalin's power and rudeness.",
        ],
        "timeline": [
            ("1887", "Brother Alexander executed."),
            ("1902", "What Is To Be Done?"),
            ("1903", "Bolshevik–Menshevik split."),
            ("Apr 1917", "Returns to Petrograd; April Theses."),
            ("Oct 1917", "Leads the seizure of power."),
            ("1918", "Brest-Litovsk; shot by Kaplan."),
            ("1921", "NEP; ban on factions."),
            ("1922–23", "Strokes; Testament."),
            ("Jan 1924", "Dies."),
        ],
        "significance": [
            "**The individual in history.** Without Lenin, the Bolsheviks in March 1917 were ready to back the Provisional Government. He is the strongest case for leadership mattering.",
            "**Pragmatist or ideologue?** Brest-Litovsk and NEP show flexibility; the Cheka and the ban on factions show a drive for control. Use this tension in legacy questions.",
            "**Continuity with tsarism.** One-party rule, secret police and censorship invite the argument that Lenin replaced one autocracy with another.",
        ],
        "links": ["trotsky", "stalin", "october-revolution", "nep", "red-terror", "constituent-assembly"],
        "questions": [
            ("How important was Lenin to the Bolshevik seizure of power in October 1917?",
             "Weigh him against the Provisional Government's failures, the Kornilov Affair and Trotsky's organisation."),
            ("To what extent had Lenin created a one-party dictatorship by 1924?",
             "Constituent Assembly, Cheka, Red Terror, ban on factions, and Kronstadt."),
        ],
    },
    {
        "id": "trotsky", "kind": "person", "name": "Leon Trotsky",
        "dates": "1879–1940", "role": "Organiser of the October rising and creator of the Red Army.",
        "aspects": ["y1905", "y1917", "civilwar"],
        "summary": """Born Lev Bronstein, Trotsky chaired the St Petersburg Soviet in 1905. He stayed outside both Social Democrat factions until he joined the Bolsheviks in summer 1917. As chairman of the Petrograd Soviet and its Military Revolutionary Committee, he organised the October rising.

As Commissar for War from 1918 he built the Red Army, using former tsarist officers watched by political commissars and enforcing discipline with executions. He toured the fronts in an armoured train. He lost the power struggle after Lenin's death and was murdered in Mexico on Stalin's orders in 1940.""",
        "facts": [
            "Chairman of the St Petersburg Soviet, 1905.",
            "Chairman of the Petrograd Soviet from September 1917; ran the Military Revolutionary Committee.",
            "Commissar for Foreign Affairs at Brest-Litovsk: \"neither war nor peace\".",
            "Commissar for War from March 1918. The Red Army reached about 5 million by 1920.",
            "Used around 50,000 former tsarist officers.",
            "Led the attack on Kronstadt in 1921.",
        ],
        "timeline": [
            ("1905", "Chairs the St Petersburg Soviet."),
            ("1917", "Joins the Bolsheviks; organises October."),
            ("1918", "Brest-Litovsk talks; becomes Commissar for War."),
            ("1918–20", "Armoured train; leads the Red Army."),
            ("1921", "Kronstadt."),
            ("1940", "Murdered in Mexico."),
        ],
        "significance": [
            "**Organiser vs leader.** Trotsky gives you a second Bolshevik leader to set against Lenin when weighing who made October happen.",
            "**Reasons for Red victory.** His leadership is one factor; set it against the Reds' central position and railways, and the divided Whites.",
        ],
        "links": ["lenin", "october-revolution", "civil-war", "brest-litovsk", "kronstadt"],
        "questions": [
            ("How far was Trotsky's leadership the main reason for Bolshevik victory in the Civil War?",
             "The core factor. Balance it with White weaknesses and Red geography."),
        ],
    },
    {
        "id": "stalin", "kind": "person", "name": "Joseph Stalin",
        "dates": "1878–1953", "role": "Bolshevik from Georgia who controlled the party machine by 1924.",
        "aspects": ["nep"],
        "summary": """Born Iosif Dzhugashvili in Georgia, Stalin was a Bolshevik organiser and bank robber before 1917. In 1917–24 he held unglamorous but powerful jobs: Commissar for Nationalities, and from April 1922 General Secretary, controlling party appointments. Lenin's Testament warned that he had \"unlimited authority concentrated in his hands\" and should be removed, but the warning was suppressed after Lenin's death.""",
        "facts": [
            "Commissar for Nationalities from 1917.",
            "General Secretary of the Communist Party from April 1922.",
            "Clashed with Lenin over Georgia in 1922.",
            "Lenin's postscript of January 1923 called him \"too rude\".",
        ],
        "timeline": [
            ("1917", "Commissar for Nationalities."),
            ("1922", "General Secretary."),
            ("1923", "Lenin's Testament criticises him."),
            ("1924", "Gives the oration at Lenin's funeral."),
        ],
        "significance": [
            "**Lenin's legacy.** Stalin's position by 1924 lets you ask whether Lenin built the system Stalin later used.",
        ],
        "links": ["lenin", "nep"],
        "questions": [
            ("To what extent had Lenin created a one-party dictatorship by 1924?",
             "Show the party machine Stalin controlled was already in place."),
        ],
    },
    # ------------------------------------------------------------------ events
    {
        "id": "russo-japanese-war", "kind": "event", "name": "The Russo-Japanese War",
        "dates": "1904–1905", "role": "A humiliating defeat in the Far East that triggered revolution.",
        "aspects": ["y1905"],
        "summary": """Russia's push into Manchuria and Korea collided with Japan. Japan attacked Port Arthur in February 1904. Some ministers welcomed war; Interior Minister Plehve is often quoted wanting a \"small victorious war\" to stop revolution. Instead Russia lost on land and at sea. The Baltic Fleet sailed halfway round the world and was destroyed at Tsushima in May 1905. Witte negotiated the Treaty of Portsmouth in September 1905.""",
        "facts": [
            "Port Arthur surrendered in January 1905.",
            "Defeat at Mukden, February–March 1905.",
            "Tsushima (May 1905): most of the Baltic Fleet sunk.",
            "Treaty of Portsmouth (USA), September 1905: Russia gave up Port Arthur and southern Sakhalin.",
        ],
        "timeline": [
            ("Feb 1904", "Japan attacks Port Arthur."),
            ("Jan 1905", "Port Arthur falls."),
            ("May 1905", "Tsushima."),
            ("Sep 1905", "Treaty of Portsmouth."),
        ],
        "significance": [
            "**War as a trigger.** Like 1914–17, war exposed the regime's incompetence. That gives you a pattern across the period.",
            "**First defeat of a European power by an Asian one.** A humiliation that shook the regime's prestige.",
        ],
        "links": ["bloody-sunday", "revolution-1905", "witte"],
        "questions": [
            ("How far was the Russo-Japanese War the main cause of the 1905 revolution?",
             "Weigh it against long-term worker and peasant grievances and Bloody Sunday."),
        ],
    },
    {
        "id": "bloody-sunday", "kind": "event", "name": "Bloody Sunday",
        "dates": "9 January 1905", "role": "Troops fire on a peaceful march to the Winter Palace.",
        "aspects": ["y1905", "autocracy"],
        "summary": """Around 150,000 workers, led by Father Gapon and carrying icons and portraits of the Tsar, marched to the Winter Palace in St Petersburg to present a petition. Nicholas was not in the city. Troops opened fire. The official death toll was about 130; opponents claimed many hundreds or more. Strikes spread across the empire within weeks.""",
        "facts": [
            "Official deaths: about 130. Other estimates run into the hundreds.",
            "The petition asked for an eight-hour day, a minimum wage and a constituent assembly.",
            "About 400,000 workers were on strike by the end of January 1905.",
        ],
        "timeline": [
            ("Dec 1904", "Strike at the Putilov works."),
            ("9 Jan 1905", "The march and the shooting."),
            ("Jan–Feb 1905", "Strike wave spreads."),
        ],
        "significance": [
            "**The end of the \"little father\".** A loyal march was shot down, and the Tsar's image as protector of his people never recovered.",
            "**Short-term trigger.** It turned discontent from the war into open revolution.",
        ],
        "links": ["gapon", "revolution-1905", "nicholas-ii"],
        "questions": [
            ("How far was Bloody Sunday the main cause of the 1905 revolution?",
             "The trigger. Set it against the war and long-term grievances."),
        ],
    },
    {
        "id": "revolution-1905", "kind": "event", "name": "The 1905 Revolution and the October Manifesto",
        "dates": "1905–1907", "role": "Strikes, mutinies and peasant risings force the Tsar to promise a parliament.",
        "aspects": ["y1905"],
        "summary": """Through 1905 Russia saw mass strikes, peasant attacks on landlords, national revolts in Poland and the Baltic, and mutinies like the battleship Potemkin in June. A general strike in October paralysed the country and workers set up the St Petersburg Soviet. On Witte's advice, Nicholas issued the October Manifesto on 17 October, promising an elected Duma and civil rights.

The Manifesto split the opposition. Liberals (Octobrists, and less fully the Kadets) accepted it. The army, back from the east and still loyal, crushed the Moscow rising in December and the Soviet leaders were arrested. Peasant unrest was put down by 1907.""",
        "facts": [
            "Potemkin mutiny: June 1905, in Odessa.",
            "October general strike: railways, factories and offices stopped.",
            "St Petersburg Soviet: October–December 1905, chaired by Trotsky.",
            "October Manifesto: elected Duma, freedom of speech, assembly and conscience.",
            "Moscow rising crushed in December 1905, with over 1,000 dead.",
            "Redemption payments halved in 1906 and abolished from 1907.",
        ],
        "timeline": [
            ("Jan 1905", "Bloody Sunday."),
            ("Jun 1905", "Potemkin mutiny."),
            ("Oct 1905", "General strike; Soviet formed; October Manifesto."),
            ("Dec 1905", "Moscow rising crushed."),
            ("1906–07", "Peasant risings suppressed by Stolypin."),
        ],
        "significance": [
            "**\"Dress rehearsal\".** Lenin's phrase. It shows workers' soviets and mutinies a decade before 1917.",
            "**Why tsarism survived.** The army stayed loyal, the opposition split, and Witte's concessions worked. In February 1917 none of these held, which makes the comparison powerful.",
        ],
        "links": ["bloody-sunday", "dumas", "witte", "stolypin", "trotsky"],
        "questions": [
            ("To what extent did the October Manifesto change the way Russia was governed in the years 1905–1914?",
             "The starting point. Then use the Fundamental Laws and the Dumas."),
            ("How far was the Tsar's survival in 1905 due to the loyalty of the army?",
             "Compare with February 1917, when the army defected."),
        ],
    },
    {
        "id": "dumas", "kind": "event", "name": "The Fundamental Laws and the Dumas",
        "dates": "1906–1917", "role": "Russia's first parliament, granted and then hollowed out.",
        "aspects": ["y1905"],
        "summary": """Days before the First Duma met, the Fundamental Laws (April 1906) declared that \"supreme autocratic power\" still belonged to the Tsar. He appointed ministers, controlled foreign policy and the army, and could rule by decree when the Duma was not sitting (Article 87).

The first two Dumas were radical and were dissolved within months. Stolypin then changed the electoral law, and the Third Duma (1907–12) was dominated by conservatives and ran its full term. The Fourth (1912–17) grew more critical, formed the Progressive Bloc in 1915, and its leaders formed the Provisional Government in 1917.""",
        "facts": [
            "First Duma: April–July 1906. Kadet majority; dissolved. The Vyborg Manifesto protest followed.",
            "Second Duma: February–June 1907; dissolved.",
            "June 1907 electoral law gave landowners far more weight than peasants and workers.",
            "Third Duma 1907–12: the most cooperative.",
            "Fourth Duma 1912–17: Progressive Bloc formed in August 1915.",
        ],
        "timeline": [
            ("Apr 1906", "Fundamental Laws; First Duma."),
            ("1907", "Second Duma dissolved; new electoral law."),
            ("1907–12", "Third Duma."),
            ("1912–17", "Fourth Duma."),
            ("Feb 1917", "Duma committee becomes the Provisional Government."),
        ],
        "significance": [
            "**Constitutional or still autocratic?** The Dumas are the evidence for whether 1905 changed anything. The Fundamental Laws point to continuity.",
            "**A school for opposition.** The Duma gave liberals a public stage, and they used it to attack the regime in wartime.",
        ],
        "links": ["revolution-1905", "stolypin", "milyukov", "nicholas-ii"],
        "questions": [
            ("To what extent did the October Manifesto change the way Russia was governed in the years 1905–1914?",
             "Main evidence on both sides."),
        ],
    },
    {
        "id": "lena-goldfields", "kind": "event", "name": "The Lena Goldfields Massacre",
        "dates": "April 1912", "role": "Troops kill striking miners in Siberia, igniting a strike wave.",
        "aspects": ["economy", "autocracy"],
        "summary": """Miners at the British-part-owned Lena goldfields struck over long hours, low pay and rotten food. On 4 April 1912 troops fired on a crowd, killing well over a hundred. Estimates range from about 150 to 270 dead. The Interior Minister's reply in the Duma, \"so it was, so it will be\", fuelled protest. Strikes rose sharply until the war.""",
        "facts": [
            "Deaths: estimates range from about 150 to 270.",
            "Strikers: about 725,000 in 1912, about 887,000 in 1913, about 1.3 million in January–July 1914.",
        ],
        "timeline": [
            ("Mar 1912", "Strike begins."),
            ("4 Apr 1912", "Troops open fire."),
            ("1912–14", "National strike wave."),
        ],
        "significance": [
            "**Was tsarism stable in 1914?** Lena and the strike wave are the main evidence that revolution was coming even without the war.",
        ],
        "links": ["first-world-war"],
        "questions": [
            ("\"By 1914 tsarism was on the brink of collapse.\" Assess the validity of this view.",
             "Use the strike figures for the \"brink\" side; set them against the 1913 boom and the Romanov tercentenary."),
        ],
    },
    {
        "id": "first-world-war", "kind": "event", "name": "The First World War",
        "dates": "1914–1917", "role": "Total war breaks the army, the economy and the monarchy.",
        "aspects": ["war"],
        "summary": """Russia entered the war in July 1914 amid patriotic enthusiasm. Defeat at Tannenberg in August 1914 and the Great Retreat of 1915 cost millions of men and huge territory. Brusilov's offensive in 1916 succeeded at first, then stalled at enormous cost.

At home, conscription took peasants from the land, the railways could not carry food to the cities, and the government printed money. Prices rose roughly fourfold. Petrograd went short of bread and fuel in the cold winter of 1916–17.""",
        "facts": [
            "Tannenberg (August 1914): around 30,000 killed or wounded and about 90,000 captured.",
            "Around 15 million men were mobilised during the war.",
            "Great Retreat (1915): Poland and much of the western borderlands lost.",
            "Brusilov Offensive (June 1916): early success, about a million Russian casualties.",
            "Prices roughly quadrupled between 1914 and early 1917.",
        ],
        "timeline": [
            ("Jul 1914", "War declared."),
            ("Aug 1914", "Tannenberg."),
            ("1915", "Great Retreat; Nicholas takes command."),
            ("Jun 1916", "Brusilov Offensive."),
            ("Winter 1916–17", "Food and fuel crisis in Petrograd."),
        ],
        "significance": [
            "**Cause or catalyst?** The central debate: did the war cause the revolution, or only speed up a collapse already under way?",
            "**It touched everything.** Army morale, food supply, inflation, the Tsar's reputation and the elites' loyalty all collapsed through the war, which helps you link factors together.",
        ],
        "links": ["nicholas-ii", "alexandra", "february-revolution", "lena-goldfields"],
        "questions": [
            ("How far was the First World War the main reason for the fall of the Tsar in February 1917?",
             "Central. Argue cause vs catalyst, using 1905 and 1912–14 as comparisons."),
        ],
    },
    {
        "id": "february-revolution", "kind": "event", "name": "The February Revolution",
        "dates": "23 February – 3 March 1917", "role": "Bread riots and an army mutiny end three centuries of Romanov rule.",
        "aspects": ["war", "y1917"],
        "summary": """On 23 February, International Women's Day, women queuing for bread in Petrograd joined striking workers. Within days it became a general strike. On 26–27 February soldiers of the Petrograd garrison, ordered to fire, mutinied and joined the crowds.

On 27 February a committee of Duma members and the new Petrograd Soviet both formed in the Tauride Palace. The generals told Nicholas he had to go. He abdicated on 2 March; his brother Michael refused the throne on 3 March. No political party had planned it.""",
        "facts": [
            "Started at the Putilov works lockout and Women's Day marches.",
            "The Volynsky Regiment mutinied first, on 27 February.",
            "Petrograd garrison: about 160,000 troops.",
            "Soviet Order No. 1 (1 March) put soldiers' committees in control of weapons.",
        ],
        "timeline": [
            ("23 Feb", "Women's Day marches; strikes."),
            ("25 Feb", "General strike in Petrograd."),
            ("27 Feb", "Garrison mutinies; Soviet and Duma committee formed."),
            ("1 Mar", "Order No. 1."),
            ("2 Mar", "Nicholas abdicates."),
        ],
        "significance": [
            "**Spontaneous or organised?** Most historians stress spontaneity, but workers' activists and soldiers made it succeed.",
            "**Army loyalty was decisive.** The contrast with 1905 is the key comparison.",
        ],
        "links": ["first-world-war", "dual-power", "nicholas-ii"],
        "questions": [
            ("\"The February Revolution was a spontaneous uprising.\" Assess the validity of this view.",
             "Show the spontaneous start and the role of the garrison and the Duma leaders."),
        ],
    },
    {
        "id": "dual-power", "kind": "event", "name": "Dual Power and the Provisional Government",
        "dates": "March–October 1917", "role": "Two rival authorities share a collapsing state.",
        "aspects": ["y1917"],
        "summary": """The Provisional Government, led first by Prince Lvov and later by Kerensky, held official power but saw itself as temporary until a Constituent Assembly could be elected. The Petrograd Soviet controlled the soldiers, railways and workers. This was \"Dual Power\".

The government kept fighting the war and postponed land reform and elections. Crises followed: the April Crisis over war aims, the failed June Offensive, the July Days rising (blamed on the Bolsheviks, who were briefly suppressed), and the Kornilov Affair in August.""",
        "facts": [
            "Freedoms granted: political prisoners amnestied, free speech, end of the death penalty (restored at the front in July).",
            "April Crisis: the Milyukov note leads to his resignation.",
            "July Days: 3–4 July. Lenin flees and Trotsky is arrested.",
            "Constituent Assembly elections put off until November.",
        ],
        "timeline": [
            ("Mar 1917", "Provisional Government under Lvov."),
            ("Apr 1917", "Lenin's April Theses; April Crisis."),
            ("Jun 1917", "June Offensive."),
            ("Jul 1917", "July Days; Kerensky becomes PM."),
            ("Aug 1917", "Kornilov Affair."),
        ],
        "significance": [
            "**Doomed from the start?** Some argue its lack of authority and the war made failure inevitable. Others blame specific choices, like continuing the war and delaying land reform.",
        ],
        "links": ["kerensky", "milyukov", "kornilov", "lenin", "october-revolution"],
        "questions": [
            ("\"The Bolsheviks took power in October 1917 because of the weakness of the Provisional Government.\" Assess the validity of this view.",
             "The core evidence for the \"weakness\" side."),
        ],
    },
    {
        "id": "october-revolution", "kind": "event", "name": "The October Revolution",
        "dates": "24–26 October 1917", "role": "The Bolsheviks seize power in Petrograd.",
        "aspects": ["y1917"],
        "summary": """Pressed by Lenin, the Bolshevik Central Committee voted on 10 October to take power. Trotsky's Military Revolutionary Committee of the Petrograd Soviet took control of bridges, stations and telegraph offices on 24–25 October with little resistance. The Winter Palace, defended by cadets and a women's battalion, was taken overnight on 25–26 October.

The Second All-Russian Congress of Soviets approved the takeover. Mensheviks and Right SRs walked out in protest. Lenin's first decrees promised peace and gave land to the peasants.""",
        "facts": [
            "Central Committee vote: 10–2 in favour (Kamenev and Zinoviev against).",
            "Few deaths in Petrograd; fighting in Moscow lasted about a week.",
            "Decree on Peace and Decree on Land, 26 October.",
            "Sovnarkom formed with Lenin as chairman.",
        ],
        "timeline": [
            ("10 Oct", "Central Committee votes for a rising."),
            ("24–25 Oct", "Military Revolutionary Committee takes key points."),
            ("25–26 Oct", "Winter Palace taken; Congress of Soviets meets."),
            ("26 Oct", "Decrees on Peace and Land."),
        ],
        "significance": [
            "**Popular revolution or coup?** Soviet historians called it a mass uprising; Western historians like Pipes call it a coup by a small party. A balanced view: a coup that rode on real popular support for \"all power to the Soviets\".",
        ],
        "links": ["lenin", "trotsky", "dual-power", "kornilov", "constituent-assembly"],
        "questions": [
            ("How important was Lenin to the Bolshevik seizure of power in October 1917?",
             "Use the 10 October vote and the role of Trotsky's MRC."),
        ],
    },
    {
        "id": "constituent-assembly", "kind": "event", "name": "The Constituent Assembly",
        "dates": "November 1917 – January 1918", "role": "Russia's only free election, overturned by the Bolsheviks.",
        "aspects": ["y1917", "civilwar", "nep"],
        "summary": """Elections promised since February went ahead in November 1917. The SRs, with their peasant support, won the most votes; the Bolsheviks came second, strong in the cities and the army. The Assembly met on 5 January 1918, refused to accept Bolshevik decrees, and was dispersed by Red Guards the next day. It never met again.""",
        "facts": [
            "SRs: about 40% of the vote. Bolsheviks: about 24%.",
            "Bolsheviks won in Petrograd, Moscow and among many soldiers.",
            "Lenin: the soviets were a \"higher form of democracy\".",
        ],
        "timeline": [
            ("Nov 1917", "Elections."),
            ("5 Jan 1918", "Assembly meets."),
            ("6 Jan 1918", "Dissolved by Red Guards."),
        ],
        "significance": [
            "**The point of no return for democracy.** It shows the Bolsheviks would not give up power through elections, and it helped start the Civil War.",
        ],
        "links": ["october-revolution", "lenin", "civil-war"],
        "questions": [
            ("To what extent had Lenin created a one-party dictatorship by 1924?",
             "The first big step. Use it early in a chronological argument."),
        ],
    },
    {
        "id": "brest-litovsk", "kind": "event", "name": "The Treaty of Brest-Litovsk",
        "dates": "3 March 1918", "role": "Peace with Germany at a huge territorial price.",
        "aspects": ["civilwar"],
        "summary": """Peace was the Bolsheviks' first promise, but Germany's terms were brutal. Trotsky stalled with \"neither war nor peace\" until Germany advanced again. Lenin then forced the Central Committee to accept even worse terms. Russia gave up Poland, the Baltic states, Finland and Ukraine. The treaty was cancelled after Germany's defeat in November 1918.""",
        "facts": [
            "Lost about a third of its population and farmland, and most of its coal and iron.",
            "The Left SRs left the government in protest.",
            "The Bolsheviks moved the capital to Moscow in March 1918.",
        ],
        "timeline": [
            ("Dec 1917", "Armistice; talks begin."),
            ("Feb 1918", "German advance resumes."),
            ("3 Mar 1918", "Treaty signed."),
            ("Nov 1918", "Annulled after Germany's defeat."),
        ],
        "significance": [
            "**Lenin's pragmatism.** He traded territory for survival, a key example for questions about his leadership.",
            "**Fuel for civil war.** Opponents called it a betrayal; it widened opposition to the Bolsheviks.",
        ],
        "links": ["lenin", "trotsky", "civil-war"],
        "questions": [
            ("How successfully did the Bolsheviks consolidate their power in the years 1917–1921?",
             "A short-term cost that bought survival."),
        ],
    },
    {
        "id": "civil-war", "kind": "event", "name": "The Civil War",
        "dates": "1918–1921", "role": "Reds against Whites, Greens and foreign intervention.",
        "aspects": ["civilwar"],
        "summary": """The war spread after the Czech Legion revolted in May 1918. The Whites were a mix of monarchists, liberals and some socialists, led by generals such as Kolchak in Siberia, Denikin in the south and Yudenich near Petrograd. Britain, France, the USA and Japan sent troops, though in small numbers. Peasant \"Green\" armies fought both sides.

The Reds held the central heartland, with Moscow, Petrograd, most industry and the railway hub. They had one leadership and one aim. The Whites were spread around the edges, divided, and associated with the return of the landlords. By the end of 1920 the main White armies were beaten. War with Poland ended with the Treaty of Riga in 1921.""",
        "facts": [
            "Kolchak's advance from Siberia stopped in 1919; he was executed in 1920.",
            "Denikin reached Orel, under 400 km from Moscow, in October 1919.",
            "Yudenich reached the outskirts of Petrograd in October 1919.",
            "Deaths from fighting, terror, disease and famine are estimated at 7–10 million.",
        ],
        "timeline": [
            ("May 1918", "Czech Legion revolt."),
            ("1919", "Major White offensives defeated."),
            ("1920", "Wrangel evacuated from Crimea; war with Poland."),
            ("1921", "Treaty of Riga."),
        ],
        "significance": [
            "**Why the Reds won.** A classic factors question: Trotsky and the Red Army, geography, unity, terror, War Communism, and White weakness.",
            "**It shaped the Soviet state.** Centralisation, militarisation and terror became habits of government.",
        ],
        "links": ["trotsky", "war-communism", "red-terror", "brest-litovsk", "kornilov"],
        "questions": [
            ("How far was Trotsky's leadership the main reason for Bolshevik victory in the Civil War?",
             "Use this as the overview of factors."),
        ],
    },
    {
        "id": "red-terror", "kind": "event", "name": "The Cheka and the Red Terror",
        "dates": "1917–1922", "role": "Secret police and mass terror against \"class enemies\".",
        "aspects": ["civilwar", "nep"],
        "summary": """The Cheka was set up in December 1917 under Felix Dzerzhinsky to fight \"counter-revolution and sabotage\". After the attempt on Lenin's life in August 1918, the Red Terror was officially declared. Hostages were shot, camps were opened, and \"class enemies\" were arrested on the basis of who they were rather than what they had done.""",
        "facts": [
            "Cheka founded 20 December 1917.",
            "Red Terror decree: 5 September 1918.",
            "Executions ran into the tens of thousands during the Civil War; estimates vary widely.",
            "Replaced by the GPU in 1922.",
        ],
        "timeline": [
            ("Dec 1917", "Cheka created."),
            ("Aug 1918", "Lenin shot; Uritsky killed."),
            ("Sep 1918", "Red Terror declared."),
            ("1922", "Cheka becomes GPU."),
        ],
        "significance": [
            "**Continuity with tsarism.** The Okhrana became the Cheka, which supports the \"new autocracy\" argument.",
            "**Terror as a reason for victory.** It held the Red rear together during the Civil War.",
        ],
        "links": ["lenin", "civil-war", "constituent-assembly"],
        "questions": [
            ("To what extent had Lenin created a one-party dictatorship by 1924?",
             "Central evidence for coercion."),
        ],
    },
    {
        "id": "war-communism", "kind": "event", "name": "War Communism",
        "dates": "1918–1921", "role": "Requisitioning and nationalisation to feed the Red Army.",
        "aspects": ["civilwar", "nep"],
        "summary": """To supply the Red Army and the cities, the Bolsheviks seized grain from peasants, nationalised industry, banned private trade and imposed labour discipline. Money lost almost all its value. Peasants hid grain or planted less, and output collapsed. A famine in 1921–22 killed around 5 million people, and peasant risings like Tambov (1920–21) spread.""",
        "facts": [
            "Nationalisation decree: June 1918.",
            "Grain requisitioning by armed detachments.",
            "By 1921 industrial output was around a fifth of 1913 levels.",
            "Tambov rising, 1920–21: tens of thousands of peasant rebels.",
        ],
        "timeline": [
            ("Jun 1918", "Nationalisation of large-scale industry."),
            ("1918–20", "Requisitioning."),
            ("1920–21", "Tambov rising."),
            ("Mar 1921", "Replaced by NEP."),
        ],
        "significance": [
            "**Necessity or ideology?** Was it an emergency war measure, or an attempt to jump straight to communism? Bukharin and others saw it as real communism.",
        ],
        "links": ["civil-war", "nep", "kronstadt"],
        "questions": [
            ("To what extent was War Communism a response to the needs of the Civil War?",
             "Central evidence on both sides."),
        ],
    },
    {
        "id": "kronstadt", "kind": "event", "name": "The Kronstadt Rising",
        "dates": "March 1921", "role": "The sailors who backed October turn against the Bolsheviks.",
        "aspects": ["civilwar", "nep"],
        "summary": """Sailors at the Kronstadt naval base, celebrated as heroes of 1917, demanded free elections to the soviets, free speech and an end to requisitioning: \"soviets without Bolsheviks\". The Red Army, led by Tukhachevsky with Trotsky in overall charge, attacked across the frozen sea and crushed the rising. It happened while the Tenth Party Congress was meeting. Lenin called it \"the flash that lit up reality\".""",
        "facts": [
            "Sailors' demands: the Petropavlovsk resolution.",
            "Assaulted on 7–18 March 1921.",
            "Thousands killed in the fighting or executed afterwards.",
        ],
        "timeline": [
            ("Feb 1921", "Strikes in Petrograd."),
            ("Mar 1921", "Rising crushed; NEP announced at the Tenth Congress."),
        ],
        "significance": [
            "**The revolution turns on its own.** It is the best evidence that the Bolsheviks had lost the workers and sailors who brought them to power.",
            "**A trigger for NEP.** Use it to show NEP was a response to crisis.",
        ],
        "links": ["war-communism", "nep", "trotsky"],
        "questions": [
            ("\"The New Economic Policy was a betrayal of Bolshevik principles.\" Assess the validity of this view.",
             "The crisis that forced the retreat."),
        ],
    },
    {
        "id": "nep", "kind": "event", "name": "The New Economic Policy",
        "dates": "1921–1928", "role": "A partial return to markets to rescue the economy.",
        "aspects": ["nep"],
        "summary": """Announced at the Tenth Party Congress in March 1921, NEP replaced requisitioning with a tax in kind. Peasants could sell their surplus, small businesses could trade for profit, and the state kept the \"commanding heights\": heavy industry, banks, railways and foreign trade. Lenin called it a step back to take two steps forward.

At the same Congress, factions within the party were banned. Economic freedom came with political tightening. NEP traders, the \"Nepmen\", and richer peasants (kulaks) did well, which angered many party members.""",
        "facts": [
            "Tax in kind (1921), later a money tax.",
            "Small firms of under about 20 workers could be private.",
            "Ban on factions: Tenth Party Congress, March 1921.",
            "\"Scissors crisis\" (1923): industrial prices rose far above farm prices.",
            "By the mid-1920s production was back near 1913 levels.",
        ],
        "timeline": [
            ("Mar 1921", "NEP and the ban on factions."),
            ("1923", "Scissors crisis."),
            ("1928", "NEP abandoned by Stalin."),
        ],
        "significance": [
            "**Pragmatism vs principle.** Was NEP a betrayal of socialism or a sensible retreat? It is the question behind most NEP essays.",
            "**Economic loosening, political tightening.** The ban on factions is key evidence for the one-party dictatorship argument.",
        ],
        "links": ["war-communism", "kronstadt", "lenin", "stalin"],
        "questions": [
            ("\"The New Economic Policy was a betrayal of Bolshevik principles.\" Assess the validity of this view.",
             "Central. Use Lenin's own justification and party opposition."),
            ("To what extent had Lenin created a one-party dictatorship by 1924?",
             "The ban on factions."),
        ],
    },
]
