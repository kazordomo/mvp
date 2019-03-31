import React from 'react';
import styled from 'styled-components';
import { 
    MdGrade, 
    MdFormatListNumbered, 
    MdShowChart, 
    MdAccountCircle, 
    MdSupervisorAccount,
    MdClose,
} from 'react-icons/md'
import colors from '../../utils/colors';

const Information = ({ show, onClose }) => {
    return (
        <InfoContainer active={show}>
            <Close>
                <MdClose onClick={onClose} />
            </Close>
            <Text>
                <p>
                    Efter varje match under säsongen öppnas röstningen för just den omgången.
                    Syftet är att dela ut tre olika lirarpoäng; 1 poäng, 2 poäng och 3 poäng.
                    Alla dessa poäng måste delas ut för att rösta. Alltså räcker det inte med att bara ge bort en
                    3-poängare till någon, även fast resterande spelare inte förtjänat poäng.
                </p>
                <p>
                    <Sub><MdGrade />Rösta:<br /></Sub>
                    Dela ut dina lirarpoäng för omgången. Röstningen är definitiv, det går inte att ändra när du väl skickat in.
                    Du väljer tre spelare och ger dem de olika värdena och skickar sedan in resultatet på "skicka"-knappen som dyker upp.
                    Det finns chans att "reseta" dina gjorda röster, fram tills du väl skickat in.
                </p>
                <p>
                    <Sub><MdFormatListNumbered />Poängliga:<br /></Sub>
                    Visar poängen för varje enskild spelare - alla poäng från varje omgång adderade.
                    Varje "spelar-rad" under poängligan är även en länk. Klickar du på en spelare hamnar du på dennes
                    profil.
                </p>
                <p>
                    <Sub><MdShowChart />Statistik:<br /></Sub>
                    Alla röster gjorda, sorterade i dess omgång. Omgångarna är sorterade efter runda, vilket innebär att
                    den senaste matchen ligger högst upp och den första längt ner. Klicka på omgången för att se hur alla användare har röstat.
                </p>
                <p>
                    <Sub><MdAccountCircle />Profil:<br /></Sub>
                    Håll koll på dina egna och andras röster.<br />
                    <b>Poäng från användare - <i>enbart för spelare: </i></b><br /> visar alla de röster denna spelare har blivit given och från vem under alla omgångar.<br />
                    <b>Utdelade poäng - <i>enbart för registrerade användare</i>:</b><br /> visar alla de röster användaren har givit och till vilka spelare under alla omgångar.
                </p>
                <p>
                    <Sub><MdSupervisorAccount />Admin:<br /></Sub>
                    <b>Öppna röstning:</b><br />
                    Efter spelad match skriver du in motståndarnas namn och trycker sedan på "Öppna röstning".
                    Nu är det möjligt för alla användare att rösta - för den omgången.<br />
                    <b>Stäng Röstning:</b><br />
                    När röstningar är gjorda är det dags att stänga omgången. Klicka på "Stäng röstning" för att
                    låsa omgångens röstning.<br />
                    <b>Gör till admin:</b><br />
                    Behövs det ytterligare någon som har tillgång till öppna/stäng röstning?
                    Skriv in mejl-addressen till denne och lägg till personen som admin.
                </p>
            </Text>
        </InfoContainer>
    )
}

const InfoContainer = styled.div`
    background-color: ${colors.grayish()};
    bottom: 0;
    color: #fff;
    left: 0;
    position: fixed;
    opacity: ${props=>props.active?'1':'0'};
    right: 0;
    top: 0;
    overflow-y: auto;
    pointer-events: ${props=>props.active?'all':'none'};
    transition: opacity 150ms ease-out;
    z-index: 6;
`;

const Close = styled.div`
    svg:first-child {
        color: #fff;
        font-size: 30px;
        position: fixed;
        right: 20px;
        top: 40px;
        z-index: 5;
    }
`;

const Text = styled.div`
    line-height: 1.3;
    padding: 70px 20px 20px 20px;
`;

const Sub = styled.div`
    color: ${colors.dirtpinkish()};
    font-size: 18px;
    margin-bottom: 5px;

    svg {
        margin-right: 5px;
    }
`;

export default Information;