<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!-- 
  ID: n01555914
  Name: Wenhao Fang
  -->
  <xsl:template match="/">
    <html>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
        crossorigin="anonymous"></link>
      <body>
        <section class="py-5 text-center">
          <div class="container">
            <h1 class="fw-light">Libraries</h1>
          </div>
        </section>

        <main class="py-3">
          <div class="container">

            <xsl:for-each select="/Libraries/Library">
              <div class="row pt-3">


                <h2 class="fw-bold">
                  <xsl:value-of select="name" />
                </h2>
                <p class="fw-lighter">
                  <xsl:value-of select="id" />
                </p>
                <p> Specialty: <xsl:value-of
                    select="specialty" />
                </p>

                <p class="font-monospace text-end">
                  <xsl:value-of select="address/street" />
                  <br />
                  <xsl:value-of select="address/city" />
                  <br />
                  <xsl:value-of select="address/region" />
                  <br />
                  <xsl:value-of select="address/country" />
                </p>

                <div class="row g-3">
                  <table class="table table-striped table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" class="col-2">Title</th>
                        <th scope="col" class="col-1">Author</th>
                        <th scope="col" class="col-3">genre</th>
                        <th scope="col" class="col-1">Year</th>
                        <th scope="col" class="col-1">ISBN</th>
                        <th scope="col" class="col-1">Availability</th>
                        <th scope="col" class="col-3">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <xsl:for-each select="catalog">
                        <tr>

                          <th>
                            <xsl:value-of select="title" />
                          </th>
                          <td>
                            <xsl:value-of select="author" />
                          </td>
                          <td>
                            <xsl:value-of select="genre" />
                          </td>
                          <td>
                            <xsl:value-of select="year" />
                          </td>
                          <td>
                            <xsl:value-of select="isbn" />
                          </td>
                          <td>
                            <xsl:value-of select="availability" />
                          </td>
                          <td>
                            <xsl:value-of select="description" />
                          </td>
                        </tr>
                      </xsl:for-each>
                    </tbody>
                  </table>
                </div>
              </div>
            </xsl:for-each>
          </div>
        </main>

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
          crossorigin="anonymous"></script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>