﻿(function () {

    'use strict';

    angular.module('shared').service('AllergensDataService', [function () {

        return {

            getAllergens: function () {
                var allergens = [
                    { "PredominantPollen": "Acacia", "CommonName": "Acacia", "Genus": "Acacia" },
                    { "PredominantPollen": "Alder", "CommonName": "Alder", "Genus": "Alnus" },
                    { "PredominantPollen": "Ash", "CommonName": "Ash", "Genus": "Fraxinus" },
					{ "PredominantPollen": "Bald Cypress", "CommonName": "Bald Cypress", "Genus": "Taxodium" },
					{ "PredominantPollen": "Beech", "CommonName": "Beech", "Genus": "Fagus" },
					{ "PredominantPollen": "Birch", "CommonName": "Birch", "Genus": "Betula" },
					{ "PredominantPollen": "Cattail", "CommonName": "Cattail", "Genus": "Typha" },
					{ "PredominantPollen": "Cedar/Juniper", "CommonName": "Juniper", "Genus": "Juniperus" },
					{ "PredominantPollen": "Chenopods", "CommonName": "Chenopods", "Genus": "Chenopods" },
					{ "PredominantPollen": "Composites", "CommonName": "Composites", "Genus": "Composites" },
					{ "PredominantPollen": "Elm", "CommonName": "Elm", "Genus": "Ulmus" },
					{ "PredominantPollen": "Ephedra", "CommonName": "Ephedra", "Genus": "Ephedra" },
					{ "PredominantPollen": "Fir", "CommonName": "Fir", "Genus": "Abies" },
					{ "PredominantPollen": "Grass", "CommonName": "Grasses", "Genus": "Grasses" },
					{ "PredominantPollen": "Hackberry", "CommonName": "Hackberry", "Genus": "Celtis" },
					{ "PredominantPollen": "Hazelnut", "CommonName": "Hazelnut", "Genus": "Corylus" },
					{ "PredominantPollen": "Hemp", "CommonName": "Hemp", "Genus": "Cannabis" },
					{ "PredominantPollen": "Hickory/Pecan", "CommonName": "Hickory", "Genus": "Carya" },
					{ "PredominantPollen": "Lamb's Quarters", "CommonName": "Goosefoot", "Genus": "Chenopodium" },
					{ "PredominantPollen": "Linden", "CommonName": "Linden", "Genus": "Tilia" },
					{ "PredominantPollen": "Locust", "CommonName": "Locust", "Genus": "Robinia" },
					{ "PredominantPollen": "Maple", "CommonName": "Maple", "Genus": "Acer" },
					{ "PredominantPollen": "Mesquite", "CommonName": "Mesquite", "Genus": "Prosopis" },
					{ "PredominantPollen": "Mixed Trace", "CommonName": "Mixed Trace", "Genus": "Mixed Trace" },
					{ "PredominantPollen": "Mulberry", "CommonName": "Mulberry", "Genus": "Morus" },
					{ "PredominantPollen": "Myrtle/Bayberry", "CommonName": "Bayberry", "Genus": "Morella" },
					{ "PredominantPollen": "Nettle", "CommonName": "Nettle", "Genus": "Urtica" },
					{ "PredominantPollen": "Oak", "CommonName": "Oak", "Genus": "Quercus" },
					{ "PredominantPollen": "Olive", "CommonName": "Olive", "Genus": "Olea" },
					{ "PredominantPollen": "Osage Orange", "CommonName": "Osage Orange", "Genus": "Maclura" },
					{ "PredominantPollen": "Palm", "CommonName": "Palm", "Genus": "Phoenix" },
					{ "PredominantPollen": "Pellitory", "CommonName": "Pellitory", "Genus": "Parietaria" },
					{ "PredominantPollen": "Pigweed", "CommonName": "Amaranth", "Genus": "Amaranthus" },
					{ "PredominantPollen": "Pine", "CommonName": "Pine", "Genus": "Pinus" },
					{ "PredominantPollen": "Plantain", "CommonName": "Plantain", "Genus": "Plantago" },
					{ "PredominantPollen": "Poplar/Aspen/Cottonwood", "CommonName": "Poplar", "Genus": "Populus" },
					{ "PredominantPollen": "Poplar/Cottonwood", "CommonName": "Poplar", "Genus": "Populus" },
					{ "PredominantPollen": "Privet", "CommonName": "Privet", "Genus": "Ligustrum" },
					{ "PredominantPollen": "Ragweed", "CommonName": "Ragweed", "Genus": "Ambrosia" },
					{ "PredominantPollen": "Sagebrush/Sage", "CommonName": "Sagebrush", "Genus": "Artemisia" },
					{ "PredominantPollen": "Sorrel/Dock", "CommonName": "Dock", "Genus": "Rumex" },
					{ "PredominantPollen": "Sweetgum", "CommonName": "SweetGum", "Genus": "Liquidambar" },
					{ "PredominantPollen": "Sycamore", "CommonName": "Sycamore", "Genus": "Platanus" },
					{ "PredominantPollen": "Tree of Heaven", "CommonName": "Tree of Heaven", "Genus": "Ailanthus" },
					{ "PredominantPollen": "Walnut", "CommonName": "Walnut", "Genus": "Juglans" },
					{ "PredominantPollen": "Willow", "CommonName": "Willow", "Genus": "Salix" },
					{ "PredominantPollen": "Mold", "CommonName": "Mold", "Genus": "MOLD" }];
                return allergens;
            }

        }

    }]);

})();
