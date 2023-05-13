using eVert.Data.Dtos.Categories;
using eVert.Data.Entities;
using eVert.Data.Repositories.Categories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace eVert.Controllers.ControllerTests
{
    [TestFixture]
    public class CategoriesControllerTests
    {
        private Mock<ICategoriesRepository> _mockRepo;
        private CategoriesController _controller;

        [SetUp]
        public void Setup()
        {
            _mockRepo = new Mock<ICategoriesRepository>();
            _controller = new CategoriesController(_mockRepo.Object, null);
        }

        [Test]
        public async Task GetMany_ReturnsListOfCategoryDtos()
        {
            // Arrange
            var categories = new List<Category>
            {
                new Category { Id = 1, Name = "Category 1" },
                new Category { Id = 2, Name = "Category 2" },
                new Category { Id = 3, Name = "Category 3" }
            };

            var mockRepo = new Mock<ICategoriesRepository>();
            mockRepo.Setup(repo => repo.GetManyAsync()).ReturnsAsync(categories);

            var controller = _controller;

            // Act
            var result = await controller.GetMany();

            // Assert
            Assert.IsInstanceOf<IReadOnlyList<GetCategoryDto>>(result);
            Assert.AreEqual(categories.Count, result.Count);
            for (int i = 0; i < categories.Count; i++)
            {
                Assert.AreEqual(categories[i].Id, result[i].Id);
                Assert.AreEqual(categories[i].Name, result[i].Name);
            }
        }

        [Test]
        public async Task GetById_ReturnsOkResult_WhenCategoryExists()
        {
            // Arrange
            int categoryId = 1;
            string categoryName = "Test Category";
            var category = new Category { Id = categoryId, Name = categoryName };

            _mockRepo.Setup(repo => repo.GetAsync(categoryId)).ReturnsAsync(category);

            var controller = _controller;

            // Act
            var result = await controller.GetById(categoryId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = (OkObjectResult)result.Result;
            Assert.IsInstanceOf<GetCategoryDto>(okResult.Value);
            var categoryDto = (GetCategoryDto)okResult.Value;
            Assert.AreEqual(categoryName, categoryDto.Name);
            Assert.AreEqual(categoryId, categoryDto.Id);
        }

        [Test]
        public async Task GetById_ReturnsNotFoundResult_WhenCategoryDoesNotExist()
        {
            // Arrange
            int categoryId = 1;

            var mockRepo = new Mock<ICategoriesRepository>();
            mockRepo.Setup(repo => repo.GetAsync(categoryId)).ReturnsAsync((Category)null);

            var controller = _controller;

            // Act
            var result = await controller.GetById(categoryId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

        [Test]
        public async Task Create_ValidCategory_ReturnsCreatedResultWithCategoryDto()
        {
            // Arrange
            var createCategoryDto = new CreateCategoryDto("Category 1");

            var mockRepo = new Mock<ICategoriesRepository>();
            mockRepo.Setup(repo => repo.CreateAsync(It.IsAny<Category>()))
                    .Callback<Category>(c => c.Id = 1)
                    .Returns(Task.CompletedTask);

            var controller = _controller;

            // Act
            var result = await controller.Create(createCategoryDto);

            // Assert
            Assert.IsInstanceOf<CreatedResult>(result.Result);
            var createdResult = (CreatedResult)result.Result;
            Assert.AreEqual("", createdResult.Location);

            Assert.IsInstanceOf<CreateCategoryDto>(createdResult.Value);
            var createdCategoryDto = (CreateCategoryDto)createdResult.Value;
            Assert.AreEqual(createCategoryDto.Name, createdCategoryDto.Name);

            mockRepo.Verify(repo => repo.CreateAsync(It.IsAny<Category>()), Times.Once);
        }

        [Test]
        public async Task Update_ReturnsOkResult_WhenCategoryExists()
        {
            // Arrange
            int categoryId = 1;
            var updateCategoryDto = new UpdateCategoryDto("New Category Name");
            var category = new Category { Id = categoryId, Name = "Old Category Name" };

            _mockRepo.Setup(repo => repo.GetAsync(categoryId)).ReturnsAsync(category);

            // Act
            var result = await _controller.Update(updateCategoryDto, categoryId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.IsInstanceOf<UpdateCategoryDto>(okResult.Value);
            var updatedCategoryDto = okResult.Value as UpdateCategoryDto;
            Assert.AreEqual(updateCategoryDto.Name, updatedCategoryDto.Name);
        }

        [Test]
        public async Task Update_ReturnsNotFoundResult_WhenCategoryDoesNotExist()
        {
            // Arrange
            int categoryId = 1;
            var updateCategoryDto = new UpdateCategoryDto("New Category Name");

            _mockRepo.Setup(repo => repo.GetAsync(categoryId)).ReturnsAsync((Category)null);

            // Act
            var result = await _controller.Update(updateCategoryDto, categoryId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

        [Test]
        public async Task Delete_CategoryExists_ReturnsNoContent()
        {
            // Arrange
            var categoryId = 1;
            var category = new Category { Id = categoryId, Name = "Test Category" };
            _mockRepo.Setup(repo => repo.GetAsync(categoryId)).ReturnsAsync(category);

            // Act
            var result = await _controller.Delete(categoryId);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
            _mockRepo.Verify(repo => repo.DeleteAsync(category), Times.Once);
        }

        [Test]
        public async Task Delete_CategoryNotFound_ReturnsNotFound()
        {
            // Arrange
            var categoryId = 1;
            _mockRepo.Setup(repo => repo.GetAsync(categoryId)).ReturnsAsync((Category)null);

            // Act
            var result = await _controller.Delete(categoryId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
            _mockRepo.Verify(repo => repo.DeleteAsync(It.IsAny<Category>()), Times.Never);
        }

    }
}
