<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/"> 
    <html>
        <body>
            <h2>Books Catalog</h2>
            <ul>
            <xsl:for-each select="//book">
                <li>
                    <h3><xsl:value-of select="title"/></h3>
                    <p><xsl:value-of select="concat('Book was written in ', year)"/></p>
                    <p><xsl:value-of select="concat('Retail price is $', price )"/></p>
                </li>
            </xsl:for-each>
            </ul>
        </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
