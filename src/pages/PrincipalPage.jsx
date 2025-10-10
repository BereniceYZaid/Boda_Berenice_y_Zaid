import Slider from "../components/Principal/Slider.jsx";
import Header from "../components/Principal/Header.jsx";
import Footer from "../components/Principal/Footer.jsx";
import ImageGrid from "../components/Principal/ImageGrid.jsx";
import Categories from "../components/Principal/Categories.jsx";
import ImageLoad from "../components/Principal/ImageLoad.jsx";
import Title from "../components/Principal/Title.jsx";
import {fetchImagenes, fetchCategories, fetchUsername} from "../services/fetchers.js";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import React, {useState} from "react";

const PrincipalPage = () => {

    /* UseState */

    const [category, setCategory] = useState("Todos");
    const [sliderImages, setSliderImages] = useState([]);

    /* Fetchers */

    const {
        data: images,
        isLoading: isLoadingImages,
        error: errorImages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["images", category],
        queryFn: ({ pageParam }) => {
            // Si no hay pageParam, es la primera carga (sin lastID)
            // Si hay pageParam, es el lastID de la página anterior
            return fetchImagenes(1, pageParam, category);
        },
        initialPageParam: undefined, // ✨ IMPORTANTE: Primera carga sin lastID
        getNextPageParam: (lastPage) => {
            // Si hay más páginas, devolver el lastID para la siguiente query
            return lastPage.hasMore ? lastPage.lastID : undefined;
        },
    });

    console.log(images?.pages[0]?.items[0]?._id);


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

    /* Transformar datos */

    const allImages = React.useMemo(() => {
        return images?.pages.flatMap((p) => p.items) ?? [];
    }, [images]);

    /* UseEffects */

    React.useEffect(() => {
        if (sliderImages.length === 0 && allImages.length > 0 ){
            setSliderImages(allImages);
        }
    },[allImages, sliderImages]);

    /* Return */

    return <>
        <Header user={username} isLoading={isLoadingUsername}
                error={errorUsername} categories={categories}/>
        <Title></Title>
        <Slider images={sliderImages} isLoading={sliderImages.length === 0} error={errorImages} />
        <Categories categories={categories} isLoading={isLoadingCategories}
                    error={errorCategories} category={category}
                    setCategory={setCategory} />
        <ImageGrid images={allImages} category={category} isLoading={isLoadingImages} firstImage={allImages.length === 0} />
        {hasNextPage && (
            <ImageLoad onLoadMore={fetchNextPage} disabled={isFetchingNextPage} />
        )}
        <Footer />
    </>
}

export default PrincipalPage;