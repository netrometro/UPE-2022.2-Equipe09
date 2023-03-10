import "./style.css"
// import { FiMoreHorizontal } from 'react-incons/fi'


export function Post({urlImage, legenda}) {
    return(
        <>
            <header>

                <div className= "infos-post">
                    <img src="https://instagram.frec10-1.fna.fbcdn.net/v/t51.2885-19/330643320_887545672294768_313219030285231815_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.frec10-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=RJ5qCDboZ48AX-KL2xw&edm=AId3EpQBAAAA&ccb=7-5&oh=00_AfDZzSp-IkFAWG_Jt6rF2A7Ya48vg_FQ3oK5JuG_0k4_oQ&oe=640D469A&_nc_sid=705020" alt="perfil" />

                    <p>Isssbs </p>


                </div>

                    {/* <FiMoreHorizontal /> */}

            </header>

            <div className="img-post">
            <img src={urlImage} alt="img" />

            </div>

            <div className="footer-post">
                <section className="engagement-post"> 
                    {legenda}
                </section>

            </div>

        </>
    )
}