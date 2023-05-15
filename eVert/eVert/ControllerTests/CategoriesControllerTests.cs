using eVert.Controllers;
using eVert.Data.Dtos.Categories;
using eVert.Data.Entities;
using eVert.Data.Repositories.Advertisements;
using eVert.Data.Repositories.Categories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace eVert.ControllerTests
{
    [TestFixture]
    public class CategoriesControllerTests
    {
        private CategoriesController _controller;
        private Mock<ICategoriesRepository> _categoriesRepositoryMock;
        private Mock<IAdvertisementsRepository> _advertisementsRepositoryMock;

        [SetUp]
        public void SetUp()
        {
            _categoriesRepositoryMock = new Mock<ICategoriesRepository>();
            _advertisementsRepositoryMock = new Mock<IAdvertisementsRepository>();
            _controller = new CategoriesController(_categoriesRepositoryMock.Object, _advertisementsRepositoryMock.Object);
        }

        [Test]
        public async Task GetMany_ReturnsCategoriesList()
        {
            // Arrange
            var categories = new List<Category>
        {
            new Category { Id = 1, Name = "Category 1" },
            new Category { Id = 2, Name = "Category 2" },
        };

            _categoriesRepositoryMock.Setup(x => x.GetManyAsync()).ReturnsAsync(categories);

            // Act
            var result = await _controller.GetMany();

            // Assert
            Assert.AreEqual(categories.Count, result.Count);
            Assert.AreEqual(categories[0].Name, result[0].Name);
            Assert.AreEqual(categories[0].Id, result[0].Id);
            Assert.AreEqual(categories[1].Name, result[1].Name);
            Assert.AreEqual(categories[1].Id, result[1].Id);
        }

        [Test]
        public async Task GetById_ReturnsCategory_WhenFound()
        {
            // Arrange
            var category = new Category { Id = 1, Name = "Category 1" };
            _categoriesRepositoryMock.Setup(x => x.GetAsync(category.Id)).ReturnsAsync(category);

            // Act
            var result = await _controller.GetById(category.Id);

            // Assert
            Assert.IsInstanceOf<GetCategoryDto>(result.Value);
            Assert.AreEqual(category.Name, result.Value.Name);
            Assert.AreEqual(category.Id, result.Value.Id);
        }

        [Test]
        public async Task GetById_ReturnsNotFound_WhenNotFound()
        {
            // Arrange
            var categoryId = 1;
            _categoriesRepositoryMock.Setup(x => x.GetAsync(categoryId)).ReturnsAsync((Category)null);

            // Act
            var result = await _controller.GetById(categoryId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

        [Test]
        public async Task Create_ReturnsCreatedResult_WhenValidInput()
        {
            // Arrange
            var createCategoryDto = new CreateCategoryDto("Category 1");

            // Act
            var result = await _controller.Create(createCategoryDto);

            // Assert
            Assert.IsInstanceOf<CreatedResult>(result.Result);
            Assert.IsInstanceOf<CreateCategoryDto>(result.Value);
            _categoriesRepositoryMock.Verify(x => x.CreateAsync(It.IsAny<Category>()), Times.Once);
        }

        [Test]
        public async Task Update_ReturnsOkResult_WhenValidInput()
        {
            // Arrange
            var updateCategoryDto = new UpdateCategoryDto("New Category Name");
            var categoryId = 1;

            _categoriesRepositoryMock.Setup(x => x.GetAsync(categoryId)).ReturnsAsync(new Category { Id = categoryId, Name = "Category 1" });
            _advertisementsRepositoryMock.Setup(repository => repository.GetAsync(It.IsAny<int>())).ReturnsAsync((int id) => { if (id == categoryId) { return null; } else { return new Advertisement(); } });

            // Act
            var result = await _controller.Update(updateCategoryDto, categoryId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.IsInstanceOf<UpdateCategoryDto>(result.Value);
            Assert.AreEqual("New Category Name", ((UpdateCategoryDto)result.Value).Name);
            _categoriesRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Category>()), Times.Once);
        }

        [Test]
        public async Task Update_ReturnsNotFoundResult_WhenInvalidCategoryId()
        {
            // Arrange
            var updateCategoryDto = new UpdateCategoryDto("New Category Name");
            var categoryId = 1;

            _advertisementsRepositoryMock
                .Setup(repository => repository.GetAsync(It.IsAny<int>()))
                .ReturnsAsync((int id) =>
                {
                    if (id == categoryId)
                    {
                        return null;
                    }
                    else
                    {
                        return new Advertisement();
                    }
                });

            // Act
            var result = await _controller.Update(updateCategoryDto, categoryId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
            _categoriesRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Category>()), Times.Never);
        }

        [Test]
        public async Task Delete_CategoryExists_ReturnsNoContentResult()
        {
            // Arrange
            int categoryId = 1;
            Category category = new Category { Id = categoryId, Name = "Test Category" };
            _categoriesRepositoryMock.Setup(x => x.GetAsync(categoryId)).ReturnsAsync(category);
            _advertisementsRepositoryMock.Setup(repository => repository.GetAsync(It.IsAny<int>())).ReturnsAsync((int id) => { if (id == categoryId) { return null; } else { return new Advertisement(); } });

            // Act
            IActionResult result = await _controller.Delete(categoryId);

            // Assert
            Assert.That(result, Is.TypeOf<NoContentResult>());
        }

        [Test]
        public async Task Delete_CategoryDoesNotExist_ReturnsNotFoundResult()
        {
            // Arrange
            int categoryId = 1;
            _advertisementsRepositoryMock.Setup(repository => repository.GetAsync(It.IsAny<int>())).ReturnsAsync((int id) => { if (id == categoryId) { return null; } else { return new Advertisement(); } });

            // Act
            IActionResult result = await _controller.Delete(categoryId);

            // Assert
            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }

        [Test]
        public async Task Delete_CategoryHasAdvertisements_ReturnsBadRequestResult()
        {
            // Arrange
            int categoryId = 1;
            Category category = new Category { Id = categoryId, Name = "Test Category" };
            Advertisement advertisement = new Advertisement { Id = 1, Title = "Test Advertisement", CategoryId = categoryId };
            _categoriesRepositoryMock.Setup(x => x.GetAsync(categoryId)).ReturnsAsync(category);
            _advertisementsRepositoryMock.Setup(x => x.GetAsync(categoryId)).ReturnsAsync(advertisement);

            // Act
            IActionResult result = await _controller.Delete(categoryId);

            // Assert
            Assert.That(result, Is.TypeOf<BadRequestResult>());
        }

    }
}
