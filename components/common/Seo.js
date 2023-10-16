import { NextSeo } from "next-seo";

const Seo = (props) => {
  const title =
    "solflix - Solana's Video Streaming Platform for Independent Filmmakers";
  const description =
    "SolFlix: Explore a New Era of Cinematic Entertainment on the Solana Blockchain. Discover Independent Films, Secure Rentals with SOL, and Support Filmmakers Worldwide. Your Gateway to Transparent, Secure, and Empowering Video Streaming.";

  const url = "https://www.solflix.live/";
  const openGraphUrl = "https://www.solflix.live/";
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url: { url },
        title,
        description,
        images: [
          {
            url: "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1689557058/DreamBacker/Disen%CC%83o_sin_ti%CC%81tulo_1_bgf6ob.png",
            width: 800,
            height: 600,
            alt: "solflix",
            type: "image/png",
          },
        ],
        site_name: "solflix",
      }}
    />
  );
};

export default Seo;
