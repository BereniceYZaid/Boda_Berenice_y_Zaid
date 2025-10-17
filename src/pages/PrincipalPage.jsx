import Slider from "../components/Principal/Slider.jsx";
import Header from "../components/Principal/Header.jsx";
import Footer from "../components/Principal/Footer.jsx";
import ImageGrid from "../components/Principal/ImageGrid.jsx";
import Categories from "../components/Principal/Categories.jsx";
import ImageLoad from "../components/Principal/ImageLoad.jsx";
import Title from "../components/Principal/Title.jsx";
import {fetchImagenes, fetchCategories, comprobarAdmin} from "../services/fetchers.js";
import {useInfiniteQuery, useQuery, useQueryClient} from "@tanstack/react-query";
import React, {useState} from "react";
import AlertContainer from "../components/Commons/AlertContainer.jsx";
import {showAlertError} from "../components/Commons/AlertError.jsx";

const PrincipalPage = () => {

    const queryClient = useQueryClient();

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

    const {
        data: categories = [],
        isLoading: isLoadingCategories,
        error: errorCategories,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    console.log("categories", categories);

    const {
        data: adminStatus,
        isLoading: isLoadingAdmin,
    } = useQuery({
        queryKey: ["adminStatus"],
        queryFn: comprobarAdmin,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });

    /* Transformar datos */

    const allImages = React.useMemo(() => {
        return images?.pages.flatMap((p) => p.items) ?? [];
    }, [images]);

    const isAdmin = !!adminStatus?.success;

    /* UseEffects */

    React.useEffect(() => {
        if (sliderImages.length === 0 && allImages.length > 0 ){
            setSliderImages(allImages);
        }
    },[allImages, sliderImages]);

    /* Alertas */

    React.useEffect(() => {
        if (errorImages) showAlertError("Hubo un error al cargar las imagenes");
    }, [errorImages]);

    /* Return */

    return <>
        <Header categories={categories} isLoading={sliderImages.length === 0} error={errorImages} queryClient={queryClient} />
        <Title />
        <Slider images={sliderImages} isLoading={sliderImages.length === 0} error={errorImages} />
        <Categories categories={categories} isLoading={isLoadingCategories}
                    error={errorCategories} category={category}
                    setCategory={setCategory} isAdmin={isAdmin} />
        <ImageGrid images={allImages} category={category} isLoading={isLoadingImages} firstImage={allImages.length === 0} isAdmin={isAdmin} categories={categories} />
        {hasNextPage && (
            <ImageLoad onLoadMore={fetchNextPage} disabled={isFetchingNextPage} />
        )}
        <Footer isAdmin={isAdmin} isLoading={sliderImages.length === 0} error={errorImages} />
        <AlertContainer />
    </>
}

export default PrincipalPage;