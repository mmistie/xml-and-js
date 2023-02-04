<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" encoding="UTF-8" />
    <xsl:template match="/">
        <html>
            <body>
                <h2>Catalog</h2>
                <ul>
                    <xsl:apply-templates select="catalog/product" />
                </ul>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="product">
        <li>
            <article>
                <h3>
                    <xsl:value-of select="@product_id" />
                </h3>
                <p>
                    <xsl:value-of select="@description" />
                </p>
                <table border="1">
                    <tr bgcolor="#87CEEB">
                        <th>Item Number</th>
                        <th>Price</th>
                        <th>Gender</th>
                        <th>Small</th>
                        <th>Medium</th>
                        <th>Large</th>
                        <th>Extra Large</th>
                    </tr>
                    <xsl:apply-templates select="catalog_item" />
                </table>
            </article>
        </li>
    </xsl:template>

    <xsl:template match="catalog_item">
        <tr>
            <td>
                <xsl:value-of select="item_number" />
            </td>
            <td>
                <xsl:value-of select="price" />
            </td>
            <td>
                <xsl:choose>
                    <xsl:when test="@gender='Men'">M</xsl:when>
                    <xsl:when test="@gender='Women'">W</xsl:when>
                </xsl:choose>
            </td>
            <xsl:apply-templates select="size" />
        </tr>
    </xsl:template>

    <xsl:template match="catalog_item">
        <tr>
            <td>
                <xsl:value-of select="item_number" />
            </td>
            <td>
                <xsl:value-of select="price" />
            </td>
            <td>
                <xsl:choose>
                    <xsl:when test="@gender='Men'">M</xsl:when>
                    <xsl:when test="@gender='Women'">W</xsl:when>
                </xsl:choose>
            </td>
            <td>
                <xsl:if test="size[@description='Small']">
                    <table border="1">
                        <tr>
                            <th bgcolor="#87CEEB">Color</th>
                            <th bgcolor="#87CEEB">Image</th>
                        </tr>
                        <xsl:apply-templates select="size[@description='Small']/color_swatch" />
                    </table>
                </xsl:if>
            </td>
            <td>
                <xsl:if test="size[@description='Medium']">
                    <table border="1">
                        <tr>
                            <th bgcolor="#87CEEB">Color</th>
                            <th bgcolor="#87CEEB">Image</th>
                        </tr>
                        <xsl:apply-templates select="size[@description='Medium']/color_swatch" />
                    </table>
                </xsl:if>
            </td>
            <td>
                <xsl:if test="size[@description='Large']">
                    <table border="1">
                        <tr>
                            <th bgcolor="#87CEEB">Color</th>
                            <th bgcolor="#87CEEB">Image</th>
                        </tr>
                        <xsl:apply-templates select="size[@description='Large']/color_swatch" />
                    </table>
                </xsl:if>
            </td>
            <td>
                <xsl:if test="size[@description='Extra Large']">
                    <table border="1">
                        <tr>
                            <th bgcolor="#87CEEB">Color</th>
                            <th bgcolor="#87CEEB">Image</th>
                        </tr>
                        <xsl:apply-templates
                            select="size[@description='Extra Large']/color_swatch" />
                    </table>
                </xsl:if>
            </td>
        </tr>
    </xsl:template>
    <xsl:template match="color_swatch">
        <tr>
            <td>
                <xsl:value-of select="." />
            </td>
            <td>
                <xsl:value-of select="@image" />
            </td>
        </tr>
    </xsl:template>
</xsl:stylesheet>