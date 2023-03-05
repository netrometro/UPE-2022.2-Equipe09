import "./style.css"
import { FiMoreHorizontal } from 'react-incons/fi'


export function Post() {
    return(
        <>
            <header>

                <div className= "infos-post">
                    <image> </image>

                    <p> </p>


                </div>

                    <FiMoreHorizontal />

            </header>

            <div className="img-post">
            <image> </image>

            </div>

            <div className="footer-post">
                <section className="engagement-post"> 


                </section>

            </div>

        </>
    )
}