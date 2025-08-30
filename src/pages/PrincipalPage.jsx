import Slider from "../components/Principal/Slider.jsx";
import Header from "../components/Principal/Header.jsx";
import Footer from "../components/Principal/Footer.jsx";
import ImageGrid from "../components/Principal/ImageGrid.jsx";
import Categories from "../components/Principal/Categories.jsx";
import ImagePages from "../components/Principal/ImagePages.jsx";
import {fetchImagenes, fetchCategories, fetchUsername} from "../services/fetchers.js";
import {useQuery} from "@tanstack/react-query";

const PrincipalPage = () => {

    /* Fetchers */

    const {
        data: images = [],
        isLoading: isLoadingImages,
        error: errorImages,
    } = useQuery({
        queryKey: ["images"],
        queryFn: fetchImagenes,
    });

    const {
        data: categories = [],
        isLoading: isLoadingCategories,
        error: errorCategories,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const {
        data: username = {},
        isLoading: isLoadingUsername,
        error: errorUsername,
    } = useQuery({
        queryKey: ["username"],
        queryFn: fetchUsername,
    });

    /* Return */

    return <>
        <Header user={username} isLoading={isLoadingUsername} error={errorUsername} />
        <Slider images={images} isLoading={isLoadingImages} error={errorImages} />
        <Categories categories={categories} isLoading={isLoadingCategories} error={errorCategories} />
        <ImageGrid images={images} />
        <ImagePages />
        <Footer />
    </>
}

export default PrincipalPage;